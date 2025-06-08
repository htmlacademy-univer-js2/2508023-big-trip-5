import { BLANK_POINT, POINT_TYPES } from '../const.js';
import { correctDateFormat } from '../utils/point.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import he from 'he';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createPointOption = (city) => `<option value="${city.name}"></option>`;

const createPointOptionsList = (destinations) => destinations === undefined ? null : destinations.map((city) => createPointOption(city)).join('');

const createPhotosTemplate = (photos) => {
  let photosTemplate = '';

  photos.forEach((photo) => {
    const { src: source, description: alt } = photo;
    const photoTemplate = `<img class="event__photo" src="${source}" alt="${alt}">`;
    photosTemplate += photoTemplate;
  });
  return photosTemplate;
};

const createPhotosList = (destination) => {
  if (destination === null || !destination.pictures) {
    return '';
  }
  return `<div class="event__photos-container">
<div class="event__photos-tape">
  ${createPhotosTemplate(destination.pictures)}
</div>
</div>`;
};

const findDestinationById = (possibleDestinations, id) => {
  let foundDestination = null;

  possibleDestinations.forEach((destination) => {
    if (destination.id === id) {
      foundDestination = destination;
    }
  });

  return foundDestination;
};

const createOffer = (offer, isChecked, isDisabled) => `<div class="event__offer-selector">
  <input class="event__offer-checkbox visually-hidden"
         id="event-offer-luggage-${offer.id}"
         type="checkbox"
         name="event-offer-luggage"
         data-id="${offer.id}"
         data-title="${offer.title}"
         data-price="${offer.price}"
         ${isChecked ? 'checked' : ''}
         ${isDisabled ? 'disabled' : ''}>
  <label class="event__offer-label" for="event-offer-luggage-${offer.id}">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
</div>`;

const createOffers = (allOffers, selectedOffers, isDisabled) => {
  let currentOffers = '';
  allOffers.forEach((offer) => {
    const isChecked = selectedOffers.includes(offer.id);
    currentOffers += createOffer(offer, isChecked, isDisabled);
  });
  return currentOffers;
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

const createTypePoints = (id, type, currentType, isDisabled) => {
  const isChecked = currentType === type ? 'checked' : '';

  return `<div class="event__type-item">
    <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isDisabled ? 'disabled' : ''} ${isChecked}>
    <label class ="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${type}</label>
  </div>`;
};
const typesToLowerCase = POINT_TYPES.map((type) => type.toLowerCase());
const createTypePointsList = (id, currentType, isDisabled) => typesToLowerCase.map((type) => createTypePoints(id, type, currentType, isDisabled)).join('');

const createAddEventTemplate = (point, possibleOffers, possibleDestinations) => {
  const { dateFrom, dateTo, price, type, id, offers, destination, isDisabled, isSaving, isDeleting, } = point;
  const newDateFrom = correctDateFormat(dateFrom);
  const newDateTo = correctDateFormat(dateTo);
  const optionsList = createPointOptionsList(possibleDestinations);

  return (
    `<form class="event event--edit" action="#" method="post">
<header class="event__header">
  <div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${createTypePointsList(id, type, isDisabled)}
      </fieldset>
    </div>
  </div>

  <div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${findDestinationById(possibleDestinations,destination) ? he.encode(findDestinationById(possibleDestinations,destination).name || '') : ''}" ${isDisabled ? 'disabled' : ''} list="destination-list-1">
    <datalist id="destination-list-1">
    ${optionsList}
    </datalist>
  </div>

  <div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${newDateFrom === 'Invalid Date' ? '' : newDateFrom}" ${isDisabled ? 'disabled' : ''}>
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${newDateTo === 'Invalid Date' ? '' : newDateTo}" ${isDisabled ? 'disabled' : ''}>
  </div>

  <div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price + exstractOffersPrice(possibleOffers[type], offers)}" ${isDisabled ? 'disabled' : ''}>
  </div>

  <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
  <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
</header>
<section class="event__details">
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${offers === null ? '' : createOffers(possibleOffers[type], point.offers, isDisabled)}
    </div>
  </section>

  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${findDestinationById(possibleDestinations,destination) ? findDestinationById(possibleDestinations,destination).description : ''}</p>
    ${createPhotosList(findDestinationById(possibleDestinations,destination))}
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
  #handleDeleteClick = null;
  #possibleOffers = null;
  #possibleDestinations = null;

  constructor({point = BLANK_POINT, possibleOffers, possibleDestinations, onFormSubmit, onDeleteClick}){
    super();
    this._setState(AddEventView.parsePointToState(point));
    this.#point = point;
    this.#possibleOffers = possibleOffers;
    this.#possibleDestinations = possibleDestinations;
    this.#onFormSubmit = onFormSubmit;
    this._restoreHandlers();
    this.#handleDeleteClick = onDeleteClick;
  }

  get template() {
    return createAddEventTemplate(this._state, this.#possibleOffers, this.#possibleDestinations);
  }

  reset(point) {
    this.updateElement(
      AddEventView.parsePointToState(point),
    );
  }

  _restoreHandlers(){
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formResetClickHandler);
    this.element.querySelector('.event__type-list').addEventListener('change', this.#pointTypeToggleHandler);
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#destinationInputHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationSelectHandler);
    this.#setDatepickerStart();
    this.#setDatepickerEnd();
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offerChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#onPriceInput);
  }

  #formResetClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(AddEventView.parseStateToPoint(this._state));
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#onFormSubmit(AddEventView.parseStateToPoint(this._state));
  };

  #pointTypeToggleHandler = (evt) => {
    evt.preventDefault();
    if (!evt.target.value){
      return;
    }
    this.updateElement({
      type: evt.target.value,
      offers: this.#possibleOffers[evt.target.value],
    }
    );
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

    const newDestination = this.#possibleDestinations.find((destination) => destination.name === evt.target.value);
    this.updateElement({
      destination: newDestination.id,
    });
  };


  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const offerCheckbox = evt.target;
    const offerId = offerCheckbox.dataset.id;
    const isChecked = offerCheckbox.checked;

    let updatedOffers = this._state.offers || [];

    if (isChecked) {
      updatedOffers = [...updatedOffers, offerId];
    } else {
      updatedOffers = updatedOffers.filter((id) => id !== offerId);
    }

    this.updateElement({
      offers: updatedOffers,
    });
  };

  #onPriceInput = (evt) => {
    evt.preventDefault();
    if (!evt.target.value){
      return;
    }
    this._setState({
      price: parseInt(evt.target.value, 10),
    });
  };

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

  static parsePointToState(point) {
    return {
      ...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }
}
