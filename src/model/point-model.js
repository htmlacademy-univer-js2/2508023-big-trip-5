import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class PointModel extends Observable {
  #points = [];
  #destinations = null;
  #offers = null;
  #pointsApiService = null;

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  #adaptPointsToClient = (point) => {
    const adaptedEvent = Object.assign(
      {},
      point,
      {
        price: point['base_price'],
        dateFrom: new Date(point['date_from']),
        dateTo: new Date(point['date_to']),
        isFavorite: point['is_favorite'],
      },
    );

    delete adaptedEvent['base_price'];
    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['is_favorite'];

    return adaptedEvent;
  };

  #adaptOffersToClient = (serverOffers) => {
    const adaptedOffers = {};
    serverOffers.forEach((serverOffer) => {
      adaptedOffers[serverOffer.type] = serverOffer.offers;
    });
    return adaptedOffers;
  };

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  getCityList() {
    const destinations = this.#points.map((point) => {
      const destination = this.#destinations.find((dest) => dest.id === point.destination);
      return destination ? destination.name : '';
    }).filter(Boolean);

    if (destinations.length > 3) {
      return `${destinations[0]} … ${destinations[destinations.length - 1]}`;
    }

    return destinations.join(' — ');
  }

  async init () {
    try {
      const events = await this.#pointsApiService.points;
      this.#points = events.map(this.#adaptPointsToClient);
    } catch (err) {
      this.#points = [];
    }

    try {
      const offers = await this.#pointsApiService.offers;
      this.#offers = this.#adaptOffersToClient(offers);
    } catch (err) {
      this.#offers = [];
    }

    try {
      this.#destinations = await this.#pointsApiService.destinations;
    } catch {
      this.#destinations = [];
    }

    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType, update){
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptPointsToClient(response);

      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error('Can\'t update event');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptPointsToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#pointsApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete point');
    }
  }
}
