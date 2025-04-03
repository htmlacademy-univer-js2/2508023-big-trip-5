import { getRandomArrayElement, getRandomInteger } from '../utils/common.js';
import { POINT_TYPES, OFFERS } from '../const';

const mockOffers = [
  {
    type: getRandomArrayElement(POINT_TYPES),
    offer: [
      {
        id: 1,
        name: getRandomArrayElement(OFFERS),
        price: getRandomInteger(1000, 2000),
      },
      {
        id: 2,
        name: getRandomArrayElement(OFFERS),
        price: getRandomInteger(1500, 2000),
      },
      {
        id: 3,
        name: getRandomArrayElement(OFFERS),
        price: getRandomInteger(1000, 1500),
      },
      {
        id: 4,
        name: getRandomArrayElement(OFFERS),
        price: getRandomInteger(100, 2000),
      },
      {
        id: 5,
        name: getRandomArrayElement(OFFERS),
        price: getRandomInteger(100, 200),
      }
    ]
  },
  {
    type: getRandomArrayElement(POINT_TYPES),
    offer: [
      {
        id: 1,
        name: getRandomArrayElement(OFFERS),
        price: getRandomInteger(1000, 2000),
      },
      {
        id: 2,
        name: getRandomArrayElement(OFFERS),
        price: getRandomInteger(1500, 2000),
      },
      {
        id: 3,
        name: getRandomArrayElement(OFFERS),
        price: getRandomInteger(1000, 1500),
      },
      {
        id: 4,
        name: getRandomArrayElement(OFFERS),
        price: getRandomInteger(100, 2000),
      },
      {
        id: 5,
        name: getRandomArrayElement(OFFERS),
        price: getRandomInteger(100, 200),
      }
    ]
  },
  {
    type: getRandomArrayElement(POINT_TYPES),
    offer: [
      {
        id: 1,
        name: getRandomArrayElement(OFFERS),
        price: getRandomInteger(1000, 2000),
      },
      {
        id: 2,
        name: getRandomArrayElement(OFFERS),
        price: getRandomInteger(1500, 2000),
      },
      {
        id: 3,
        name: getRandomArrayElement(OFFERS),
        price: getRandomInteger(1000, 1500),
      },
      {
        id: 4,
        name: getRandomArrayElement(OFFERS),
        price: getRandomInteger(100, 2000),
      },
      {
        id: 5,
        name: getRandomArrayElement(OFFERS),
        price: getRandomInteger(100, 200),
      }
    ]
  },
  {
    type: getRandomArrayElement(POINT_TYPES),
    offer: [
      {
        id: 1,
        name: getRandomArrayElement(OFFERS),
        price: getRandomInteger(1000, 2000),
      },
      {
        id: 2,
        name: getRandomArrayElement(OFFERS),
        price: getRandomInteger(1500, 2000),
      },
      {
        id: 3,
        name: getRandomArrayElement(OFFERS),
        price: getRandomInteger(1000, 1500),
      },
      {
        id: 4,
        name: getRandomArrayElement(OFFERS),
        price: getRandomInteger(100, 2000),
      },
      {
        id: 5,
        name: getRandomArrayElement(OFFERS),
        price: getRandomInteger(100, 200),
      }
    ]
  },
  {
    type: getRandomArrayElement(POINT_TYPES),
    offer: [
      {
        id: 1,
        name: getRandomArrayElement(OFFERS),
        price: getRandomInteger(1000, 2000),
      },
      {
        id: 2,
        name: getRandomArrayElement(OFFERS),
        price: getRandomInteger(1500, 2000),
      },
      {
        id: 3,
        name: getRandomArrayElement(OFFERS),
        price: getRandomInteger(1000, 1500),
      },
      {
        id: 4,
        name: getRandomArrayElement(OFFERS),
        price: getRandomInteger(100, 2000),
      },
      {
        id: 5,
        name: getRandomArrayElement(OFFERS),
        price: getRandomInteger(100, 200),
      }
    ]
  }
];

const getOffers = () => mockOffers;

export {getOffers, mockOffers};
