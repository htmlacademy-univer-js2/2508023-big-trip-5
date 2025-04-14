import { nanoid } from 'nanoid';
import { getRandomArrayElement, getRandomInteger } from '../utils/common.js';
import { getOffers } from './offers';
import { POINT_TYPES, DESCRIPTIONS, DESTINATIONS } from '../const';
import { getDestinations } from './destination';

const mockPoint = [
  {
    type: getRandomArrayElement(POINT_TYPES),
    destination: getDestinations(),
    dateFrom: '2025-04-14T20:18:12.653Z',
    dateTo: '2025-04-15T01:35:13.536Z',
    offers: getOffers(),
    price: getRandomInteger(100, 1000),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
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
    type: getRandomArrayElement(POINT_TYPES),
    destination: getRandomArrayElement(DESTINATIONS),
    dateFrom: '2025-02-15T12:18:12.653Z',
    dateTo: '2025-02-15T13:15:13.536Z',
    offers: getOffers(),
    price: getRandomInteger(100, 1000),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
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
    type: getRandomArrayElement(POINT_TYPES),
    destination: getRandomArrayElement(DESTINATIONS),
    dateFrom: '2025-06-10T10:10:10.601Z',
    dateTo: '2025-06-10T15:17:13.536Z',
    offers: getOffers(),
    price: getRandomInteger(100, 1000),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
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
    type: getRandomArrayElement(POINT_TYPES),
    destination: getRandomArrayElement(DESTINATIONS),
    dateFrom: '2025-01-07T19:18:12.601Z',
    dateTo: '2025-01-07T23:20:45.536Z',
    offers: getOffers(),
    price: getRandomInteger(100, 1000),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
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
    type: getRandomArrayElement(POINT_TYPES),
    destination: getRandomArrayElement(DESTINATIONS),
    dateFrom: '2025-04-14T20:55:12.601Z',
    dateTo: '2025-04-15T02:21:55.536Z',
    offers: getOffers(),
    price: getRandomInteger(100, 1000),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
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

const getRandomPoint = () => ({
  id: nanoid(),
  ...getRandomArrayElement(mockPoint)
});

export { getRandomPoint };
