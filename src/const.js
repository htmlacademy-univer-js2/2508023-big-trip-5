import { getRandomInteger } from './utils/common';

const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const BLANK_POINT = {
  id: getRandomInteger(0, 100),
  type: 'flight',
  destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
  dateFrom: null,
  dateTo: null,
  offers: [],
  price: 0,
  isFavorite: false,
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offer',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export { POINT_TYPES, FilterType, SortType, UpdateType, UserAction, BLANK_POINT };
