import AbstractView from '../framework/view/abstract-view.js';

const calculatePrice = (points, possibleOffers) => {
  const priceTotal = points.reduce((total, point) => {
    const { price, offers, type } = point;
    const newOffers = (possibleOffers[type] || []).filter((offer) => offers.includes(offer.id));
    let offersTotal = 0;

    if (newOffers && newOffers.length > 0) {
      offersTotal = newOffers.reduce((sum, offer) => (sum += offer.price), 0);
    }

    total += price + offersTotal;
    return total;
  }, 0);

  return priceTotal;
};

const createCostTemplate = (price) => (
  `<p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
    </p>`
);

export default class TotalPriceView extends AbstractView {
  #price = null;

  constructor(points, possibleOffers) {
    super();
    this.#price = calculatePrice(points, possibleOffers);
  }

  get template() {
    return createCostTemplate(this.#price);
  }
}
