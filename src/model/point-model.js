import { getRandomPoint } from '../mock/point';
import { mockDestination } from '../mock/destination';
import { mockOffers } from '../mock/offers';

const POINS_COUNT = 5;

export default class PointModel{
  points = Array.from({length: POINS_COUNT}, getRandomPoint);
  destinations = mockDestination;
  offers = mockOffers;

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

}
