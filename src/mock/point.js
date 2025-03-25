import { getRandomArrayElement, getRandomInteger } from '../../utils';
import { POINT_TYPES, DESCRIPTIONS, DESTINATIONS, OFFERS } from '../const';


const mockPoint = [
  {
    id: 1,
    type: getRandomArrayElement(POINT_TYPES),
    destination: getRandomArrayElement(DESTINATIONS),
    dateFrom: '2025-04-14T20:18:12.653Z',
    dateTo: '2025-04-15T1:35:13.536Z',
    offers: [getRandomArrayElement(OFFERS), getRandomArrayElement(OFFERS)],
    price: getRandomInteger(100, 1000),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      }
    ],
    isFavorite: true,
  },
  {
    id: 2,
    type: getRandomArrayElement(POINT_TYPES),
    destination: getRandomArrayElement(DESTINATIONS),
    dateFrom: '2025-02-15T12:18:12.653Z',
    dateTo: '2025-02-15T13:15:13.536Z',
    offers: [getRandomArrayElement(OFFERS), getRandomArrayElement(OFFERS)],
    price: getRandomInteger(100, 1000),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      }
    ],
    isFavorite: false,
  },
  {
    id: 3,
    type: getRandomArrayElement(POINT_TYPES),
    destination: getRandomArrayElement(DESTINATIONS),
    dateFrom: '2025-06-10T10:10:10.601Z',
    dateTo: '2025-06-10T1:17:13.536Z',
    offers: [getRandomArrayElement(OFFERS), getRandomArrayElement(OFFERS)],
    price: getRandomInteger(100, 1000),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      }
    ],
    isFavorite: true,
  },
  {
    id: 4,
    type: getRandomArrayElement(POINT_TYPES),
    destination: getRandomArrayElement(DESTINATIONS),
    dateFrom: '2025-01-07T19:18:12.601Z',
    dateTo: '2025-01-07T1:20:45.536Z',
    offers: [getRandomArrayElement(OFFERS), getRandomArrayElement(OFFERS)],
    price: getRandomInteger(100, 1000),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      }
    ],
    isFavorite: true,
  },
  {
    id: 5,
    type: getRandomArrayElement(POINT_TYPES),
    destination: getRandomArrayElement(DESTINATIONS),
    dateFrom: '2025-04-14T20:55:12.601Z',
    dateTo: '2025-04-15T1:21:55.536Z',
    offers: [getRandomArrayElement(OFFERS), getRandomArrayElement(OFFERS)],
    price: getRandomInteger(100, 1000),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      }
    ],
    isFavorite: true,
  }
];

const getRandomPoint = () => getRandomArrayElement(mockPoint);

export { getRandomPoint };
