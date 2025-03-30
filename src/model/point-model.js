import { getRandomPoint } from '../mock/point';
import { mockDestination } from '../mock/destination';
import { mockOffers } from '../mock/offers';

const POINS_COUNT = 5;

export default class PointModel{
  #points = Array.from({length: POINS_COUNT}, getRandomPoint);
  #destinations = mockDestination;
  #offers = mockOffers;

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

}
