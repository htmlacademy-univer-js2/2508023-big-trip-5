import dayjs from 'dayjs';
import { getRandomInteger } from './utils/common';

const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const DESCRIPTIONS = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus.'];

const DESTINATIONS = ['Paris', 'Madrid', 'New-York', 'Moskow', 'London', 'Berlin', 'Rome', 'Tokyo', 'Rio', 'Egypt'];

const OFFERS = ['Upgrade to a business class', 'Rent a car', 'Add luggage', 'Book tickets', 'Choose seats', 'Add meal'];

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

const BLANK_POINT = {
  id: getRandomInteger(0, 100),
  type: 'taxi',
  destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
  dateFrom: dayjs('2019-07-10T22:55:56.845Z').format('DD/MM/YY HH:mm'),
  dateTo: dayjs('2019-07-11T11:22:13.375Z').format('DD/MM/YY HH:mm'),
  offers: [
    'b4c3e4e6-9053-42ce-b747-e281314baa31'
  ],
  price: 1100,
  isFavorite: false,
};

export { POINT_TYPES, DESCRIPTIONS, DESTINATIONS, OFFERS, FilterType, SortType, UpdateType, UserAction, BLANK_POINT };
