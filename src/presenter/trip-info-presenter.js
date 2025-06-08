import RouteView from '../view/route-view.js';
import TotalPriceView from '../view/total-price-view.js';
import { render, remove, RenderPosition } from '../framework/render.js';

export default class TripInfoPresenter {
  #routeContainer = null;
  #pointModel = null;
  #routeComponent = null;
  #totalPriceComponent = null;

  constructor(routeBoard, pointModel) {
    this.#routeContainer = routeBoard;
    this.#pointModel = pointModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    this.#renderRoute();
  };

  #removeRoute = () => {
    if (this.#routeComponent !== null) {
      remove(this.#routeComponent);
      remove(this.#totalPriceComponent);
    }
  };

  #renderRoute = () => {
    const points = this.#pointModel.points;

    if (points.length > 0) {
      this.#routeComponent = new RouteView(points, this.#pointModel.destinations);
      this.#totalPriceComponent = new TotalPriceView(points, this.#pointModel.offers);

      render(this.#routeComponent, this.#routeContainer, RenderPosition.AFTERBEGIN);

      const tripInfoElement = document.querySelector('.trip-info');
      render(this.#totalPriceComponent, tripInfoElement, RenderPosition.BEFOREEND);
    }
  };

  #handleModelEvent = () => {
    this.#removeRoute();
    this.#renderRoute();
  };
}
