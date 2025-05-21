import Observable from '../framework/observable.js';
import { mockDestination } from '../mock/destination';
import { mockOffers } from '../mock/offers';
import { correctDateFormat } from '../utils/point.js';
import { UpdateType } from '../const.js';

export default class PointModel extends Observable{
  #points = [];
  #destinations = mockDestination;
  #offers = mockOffers;
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
        dateFrom: correctDateFormat(point['date_from']),
        dateTo: correctDateFormat(point['date_to']),
        isFavorite: point['is_favorite'],
      },
    );

    delete adaptedEvent['base_price'];
    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['is_favorite'];

    return adaptedEvent;
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

  async init() {
    try {
      const points = await this.#pointsApiService.tasks;
      this.#points = points.map(this.#adaptPointsToClient);
    } catch(err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }

}
