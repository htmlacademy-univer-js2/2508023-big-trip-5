import { getRandomInteger } from '../utils/common.js';
import { correctDateFormat } from '../utils/point.js';
import { POINT_TYPES } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

const BLANK_POINT = {
  id: 0,
  type: POINT_TYPES[0],
  destination: null,
  dateFrom: '',
  dateTo: '',
  offers: null,
  price: 0,
  pictures: [
    {
      src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
      description: ''
    },
    {
      src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
      description: ''
    },
    {
      src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
      description: ''
    },
    {
      src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
      description: ''
    },
    {
      src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
      description: ''
    }
  ],
  isFavorite: false,
};

const createAddEventTemplate = (point) => {
  const {destination, dateFrom, dateTo, price, pictures, offers, type } = point;
  const newDateFrom = correctDateFormat(dateFrom);
  const newDateTo = correctDateFormat(dateTo);

  return (
    `<form class="event event--edit" action="#" method="post">
<header class="event__header">
  <div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>

        <div class="event__type-item">
          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
        </div>

        <div class="event__type-item">
          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
        </div>

        <div class="event__type-item">
          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
        </div>

        <div class="event__type-item">
          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
        </div>

        <div class="event__type-item">
          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
        </div>

        <div class="event__type-item">
          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
        </div>

        <div class="event__type-item">
          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
        </div>

        <div class="event__type-item">
          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
        </div>

        <div class="event__type-item">
          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
        </div>
      </fieldset>
    </div>
  </div>

  <div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${destination} list="destination-list-1">
    <datalist id="destination-list-1">
     <option value="France">France</option>
     <option value="Amsterdam">Amsterdam</option>
     <option value="Geneva">Geneva</option>
     <option value="Chamonix">Chamonix</option>
    </datalist>
  </div>

  <div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${newDateFrom}>
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${newDateTo}>
  </div>

  <div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${price}>
  </div>

  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
  <button class="event__reset-btn" type="reset">Cancel</button>
</header>
<section class="event__details">
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
        <label class="event__offer-label" for="event-offer-luggage-1">
          <span class="event__offer-title">${offers[getRandomInteger(0,4)].type}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offers[getRandomInteger(0, 4)].offer[getRandomInteger(0, 4)].price}</span>
        </label>
      </div>

      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
        <label class="event__offer-label" for="event-offer-comfort-1">
          <span class="event__offer-title">${offers[getRandomInteger(0,4)].type}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offers[getRandomInteger(0, 4)].offer[getRandomInteger(0, 4)].price}</span>
        </label>
      </div>

      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
        <label class="event__offer-label" for="event-offer-meal-1">
          <span class="event__offer-title">${offers[getRandomInteger(0,4)].type}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offers[getRandomInteger(0, 4)].offer[getRandomInteger(0, 4)].price}</span>
        </label>
      </div>

      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
        <label class="event__offer-label" for="event-offer-seats-1">
          <span class="event__offer-title">${offers[getRandomInteger(0,4)].type}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offers[getRandomInteger(0, 4)].offer[getRandomInteger(0, 4)].price}</span>
        </label>
      </div>

      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
        <label class="event__offer-label" for="event-offer-train-1">
          <span class="event__offer-title">${offers[getRandomInteger(0,4)].type}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offers[getRandomInteger(0, 4)].offer[getRandomInteger(0, 4)].price}</span>
        </label>
      </div>
    </div>
  </section>

  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${pictures[getRandomInteger(0,4)].description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        <img class="event__photo" src=${pictures[getRandomInteger(0,4)].src} alt="Event photo">
        <img class="event__photo" src=${pictures[getRandomInteger(0,4)].src} alt="Event photo">
        <img class="event__photo" src=${pictures[getRandomInteger(0,4)].src} alt="Event photo">
        <img class="event__photo" src=${pictures[getRandomInteger(0,4)].src} alt="Event photo">
        <img class="event__photo" src=${pictures[getRandomInteger(0,4)].src} alt="Event photo">
      </div>
    </div>
  </section>
</section>
</form>`
  );
};

export default class AddEventView extends AbstractStatefulView{
  #point = null;
  #onFormSubmit = null;

  constructor({point = BLANK_POINT, onFormSubmit}){
    super();
    this._setState(AddEventView.parsePointToState(point));
    this.#point = point;
    this.#onFormSubmit = onFormSubmit;
    this._restoreHandlers();
  }

  get template() {
    return createAddEventTemplate(this._state);
  }

  reset(point) {
    this.updateElement(
      AddEventView.parseTaskToState(point),
    );
  }

  _restoreHandlers(){
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formSubmitHandler);
    this.element.querySelectorAll('.event__type-label').forEach((label) => {
      label.addEventListener('click', this.#pointTypeToggleHandler);
    });
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#destinationInputHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationSelectHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#onFormSubmit(AddEventView.parseStateToPoint(this._state));
  };

  #pointTypeToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.textContent,
    });
  };

  #destinationInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      destination: evt.target.value,
    });
  };

  #destinationSelectHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      destination: evt.target.value,
    });
  };

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    const point = {...state};

    return point;
  }
}
