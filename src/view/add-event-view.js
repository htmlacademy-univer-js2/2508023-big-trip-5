import { getRandomInteger, generateOffers, generatePictures } from '../utils/common.js';
import { correctDateFormat } from '../utils/point.js';
import { POINT_TYPES, DESTINATIONS } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';


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

const createPointOption = (cityName) => `<option value="${cityName}"></option>`;
const createPointOptionsList = () => DESTINATIONS.map((cityName) => createPointOption(cityName)).join('');

const createPhoto = (photo) => `<img class="event__photo" src=${photo.src} alt="Event photo"></img>`;
const createPhotosList = (pictures) => pictures.map((photo) => createPhoto(photo)).join('');

const createOffer = (offer) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${offer.id - 1}" type="checkbox" name="event-offer-luggage" checked>
        <label class="event__offer-label" for="event-offer-luggage-${offer.id - 1}">
          <span class="event__offer-title">${offer.name}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`;
const createOffers = (offers) => offers.map((offer) => createOffer(offer)).join('');

const createTypePoints = (id, type, currentType) => {
  const isChecked = currentType === type ? 'checked' : '';

  return `<div class="event__type-item">
    <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked}>
    <label class ="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${type}</label>
  </div>`;
};
const typesToLowerCase = POINT_TYPES.map((type) => type.toLowerCase());
const createTypePointsList = (id, currentType) => typesToLowerCase.map((type) => createTypePoints(id, type, currentType)).join('');

const createAddEventTemplate = (point) => {
  const {destination, dateFrom, dateTo, price, pictures, offers, type, id } = point;
  const newDateFrom = correctDateFormat(dateFrom);
  const newDateTo = correctDateFormat(dateTo);

  return (
    `<form class="event event--edit" action="#" method="post">
<header class="event__header">
  <div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${createTypePointsList(id, type)}
      </fieldset>
    </div>
  </div>

  <div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${destination} list="destination-list-1">
    <datalist id="destination-list-1">
    ${createPointOptionsList()}
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
      ${createOffers(offers[getRandomInteger(0,4)].offer)}
    </div>
  </section>

  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${pictures[getRandomInteger(0,4)].description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${createPhotosList(pictures)}
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
  #datepickerStart = null;
  #datepickerEnd = null;

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

  #setDatepickerStart = () => {
    if (this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
    }
    this.#datepickerStart = flatpickr(
      this.element.querySelector('input[name=event-start-time]'),
      {
        dateFormat: 'd/m/y H:i',
        ['time_24hr']: true,
        enableTime: true,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateStartChangeHandler,
      },
    );
  };

  #setDatepickerEnd = () => {
    if (this.#datepickerEnd) {
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }
    this.#datepickerStart = flatpickr(
      this.element.querySelector('input[name=event-end-time]'),
      {
        dateFormat: 'd/m/y H:i',
        ['time_24hr']: true,
        enableTime: true,
        defaultDate: this._state.dateTo,
        onChange: this.#dateEndChangeHandler,
      },
    );
  };

  #dateStartChangeHandler = ([chosenDate]) => {
    this.updateElement({
      dateFrom: chosenDate,
    });
  };

  #dateEndChangeHandler = ([chosenDate]) => {
    this.updateElement({
      dateTo: chosenDate,
    });
  };

  reset(point) {
    this.updateElement(
      AddEventView.parsePointToState(point),
    );
  }

  _restoreHandlers(){
    this.element.addEventListener('event__save-btn', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formSubmitHandler);
    this.element.querySelector('.event__type-list').addEventListener('change', this.#pointTypeToggleHandler);
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#destinationInputHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationSelectHandler);
    this.#setDatepickerStart();
    this.#setDatepickerEnd();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#onFormSubmit(AddEventView.parseStateToPoint(this._state));
  };

  #pointTypeToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: generateOffers(evt.target.value),
    });
  };

  #destinationInputHandler = (evt) => {
    evt.preventDefault();
    if (!evt.target.value){
      return;
    }
    this._setState({
      destination: evt.target.value,
    });
  };

  #destinationSelectHandler = (evt) => {
    evt.preventDefault();
    if (!evt.target.value){
      return;
    }
    this.updateElement({
      destination: evt.target.value,
      pictures: generatePictures(),
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
