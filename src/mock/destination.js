import { DESCRIPTIONS, DESTINATIONS } from '../const';
import { getRandomArrayElement, getRandomInteger } from '../utils/common.js';

const mockDestination = [
  {
    id: 1,
    description: getRandomArrayElement(DESCRIPTIONS),
    destination: getRandomArrayElement(DESTINATIONS),
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
      }
    ]
  },
  {
    id: 2,
    description: getRandomArrayElement(DESCRIPTIONS),
    destination: getRandomArrayElement(DESTINATIONS),
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
      }
    ]
  },
  {
    id: 3,
    description: getRandomArrayElement(DESCRIPTIONS),
    destination: getRandomArrayElement(DESTINATIONS),
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
      }
    ]
  },
  {
    id: 4,
    description: getRandomArrayElement(DESCRIPTIONS),
    destination: getRandomArrayElement(DESTINATIONS),
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
      }
    ]
  },
  {
    id: 5,
    description: getRandomArrayElement(DESCRIPTIONS),
    destination: getRandomArrayElement(DESTINATIONS),
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
      }
    ]
  }
];

const getDestinations = () => getRandomArrayElement(DESTINATIONS);

export { mockDestination, getDestinations };
