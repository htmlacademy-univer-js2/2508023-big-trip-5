import { extractDate, extractTime, calculateFlightTime } from '../utils/point.js';
import AbstractView from '../framework/view/abstract-view.js';

const createOffers = (offers, offersId) => {
  let newOffers = '';

  offers.forEach((offer) => {
    if (offersId.includes(offer.id)) {
      const { title, price } = offer;

      const offerTemplate = `<li class="event__offer">
        <span class="event__offer-title">${title}</span>
                    &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
        </li>`;

      newOffers += offerTemplate;
    }
  });
  return newOffers;
};

const exstractOffersPrice = (allOffers, offers) => {
  let priceWithOffers = 0;
  allOffers.forEach((offer) => {
    const isChecked = offers.includes(offer.id);
    if (isChecked){
      priceWithOffers += offer.price;
    }
  });
  return priceWithOffers;
};

const createEventTemplate = (point, possibleOffers) => {
  const {dateFrom, dateTo, price, type, isFavorite, offers} = point;
  const date = extractDate(dateFrom);
  const startTime = extractTime(dateFrom);
  const endTime = extractTime(dateTo);
  const activeFavorite = isFavorite ? '--active' : '';
  point['offersPrice'] = exstractOffersPrice(possibleOffers[type], offers);

  return (`
  <div class="event">
    <time class="event__date" datetime="2019-03-18">${date}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime=${dateFrom}>${startTime}</time>
        &mdash;
        <time class="event__end-time" datetime=${dateTo}>${endTime}</time>
      </p>
      <p class="event__duration">${calculateFlightTime(dateFrom, dateTo)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${price + exstractOffersPrice(possibleOffers[type], offers)}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${createOffers(possibleOffers[type], offers)}
    </ul>
    <button class="event__favorite-btn event__favorite-btn${activeFavorite}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
`);
};

export default class EventView extends AbstractView {
  #point = null;
  #onOpenEventClick = null;
  #handleFavoriteClick = null;
  #possibleOffers = null;

  constructor({point, possibleOffers, onOpenEventClick, onFavoriteClick}){
    super();
    this.#point = point;
    this.#possibleOffers = possibleOffers;
    this.#onOpenEventClick = onOpenEventClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#openEventClickHandler.bind(this));
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template(){
    return createEventTemplate(this.#point, this.#possibleOffers);
  }

  #openEventClickHandler = (evt) => {
    evt.preventDefault();
    this.#onOpenEventClick(evt);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
