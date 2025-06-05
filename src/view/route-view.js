import AbstractView from '../framework/view/abstract-view.js';

import { sortByDate, createDateTemplate } from '../utils/point.js';

const showStartEndPoints = (sortedPoints, destinations) => {
  const startDestination = destinations.find(
    (destination) => destination.id === sortedPoints[0].destination
  );
  const endDestination = destinations.find(
    (destination) => destination.id === sortedPoints[sortedPoints.length - 1].destination
  );

  const startPointName = startDestination.name;
  const endPointName = endDestination.name;

  const startPointDate = createDateTemplate(sortedPoints[0].dateFrom, 'MMM DD');
  const endPointDate = createDateTemplate(sortedPoints[sortedPoints.length - 1].dateFrom, 'MMM DD');

  const routeMessage = sortedPoints.length > 2 ? `${startPointName} &mdash; ... &mdash; ${endPointName}` : `${startPointName} &mdash; ${endPointName}`;

  const routeDates = `${startPointDate}&nbsp;&mdash;&nbsp;${endPointDate}`;

  return (
    `<h1 class="trip-info__title">${routeMessage}</h1>
          <p class="trip-info__dates">${routeDates}</p>`
  );
};

const createTripInfoTemplate = (sortedPoints, destinations) => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">

    ${showStartEndPoints(sortedPoints, destinations)}

    </div>
  </section>`
);

export default class RouteView extends AbstractView {
  #points = null;
  #destinations = null;

  constructor(points, destinations) {
    super();
    this.#points = sortByDate(points);
    this.#destinations = destinations;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#destinations);
  }
}
