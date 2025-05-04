import { getRandomArrayElement, getRandomInteger } from '../utils/common.js';
import { POINT_TYPES, OFFERS } from '../const';

const mockOffers = [
  {
    type: getRandomArrayElement(POINT_TYPES),
    offer: [
      {
        id: 1,
        name: OFFERS[0],
        price: getRandomInteger(1000, 2000),
      },
      {
        id: 2,
        name: OFFERS[5],
        price: getRandomInteger(1500, 2000),
      },
      {
        id: 3,
        name: OFFERS[2],
        price: getRandomInteger(1000, 1500),
      },
      {
        id: 4,
        name: OFFERS[3],
        price: getRandomInteger(100, 2000),
      },
      {
        id: 5,
        name: OFFERS[1],
        price: getRandomInteger(100, 200),
      }
    ]
  },
  {
    type: getRandomArrayElement(POINT_TYPES),
    offer: [
      {
        id: 1,
        name: OFFERS[0],
        price: getRandomInteger(1000, 2000),
      },
      {
        id: 2,
        name: OFFERS[1],
        price: getRandomInteger(1500, 2000),
      },
      {
        id: 3,
        name: OFFERS[5],
        price: getRandomInteger(1000, 1500),
      },
      {
        id: 4,
        name: OFFERS[2],
        price: getRandomInteger(100, 2000),
      },
      {
        id: 5,
        name: OFFERS[4],
        price: getRandomInteger(100, 200),
      }
    ]
  },
  {
    type: getRandomArrayElement(POINT_TYPES),
    offer: [
      {
        id: 1,
        name: OFFERS[3],
        price: getRandomInteger(1000, 2000),
      },
      {
        id: 2,
        name: OFFERS[2],
        price: getRandomInteger(1500, 2000),
      },
      {
        id: 3,
        name: OFFERS[4],
        price: getRandomInteger(1000, 1500),
      },
      {
        id: 4,
        name: OFFERS[0],
        price: getRandomInteger(100, 2000),
      },
      {
        id: 5,
        name: OFFERS[5],
        price: getRandomInteger(100, 200),
      }
    ]
  },
  {
    type: getRandomArrayElement(POINT_TYPES),
    offer: [
      {
        id: 1,
        name: OFFERS[1],
        price: getRandomInteger(1000, 2000),
      },
      {
        id: 2,
        name: OFFERS[5],
        price: getRandomInteger(1500, 2000),
      },
      {
        id: 3,
        name: OFFERS[2],
        price: getRandomInteger(1000, 1500),
      },
      {
        id: 4,
        name: OFFERS[0],
        price: getRandomInteger(100, 2000),
      },
      {
        id: 5,
        name: OFFERS[4],
        price: getRandomInteger(100, 200),
      }
    ]
  },
  {
    type: getRandomArrayElement(POINT_TYPES),
    offer: [
      {
        id: 1,
        name: OFFERS[0],
        price: getRandomInteger(1000, 2000),
      },
      {
        id: 2,
        name: OFFERS[5],
        price: getRandomInteger(1500, 2000),
      },
      {
        id: 3,
        name: OFFERS[2],
        price: getRandomInteger(1000, 1500),
      },
      {
        id: 4,
        name: OFFERS[3],
        price: getRandomInteger(100, 2000),
      },
      {
        id: 5,
        name: OFFERS[4],
        price: getRandomInteger(100, 200),
      }
    ]
  }
];

const getOffers = () => mockOffers;

export {getOffers, mockOffers};
