import { OFFERS, DESCRIPTIONS } from '../const';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (items) => items[getRandomInteger(0, items.length - 1)];

const makeOffers = () => {
  const offers = [];
  let index = 0;

  for (let i = 1; i <= 5; i++) {
    const offer = {
      id: index + 1,
      name: OFFERS[index],
      price: getRandomInteger(20, 200),
    };
    offers.push(offer);
    index++;
  }
  return offers;
};

const generateOffers = (type) => {
  const offerElements = [];
  for (let i = 1; i <= 5; i++) {
    const offerElement = {
      type: type,
      offer: makeOffers(),
    };
    offerElements.push(offerElement);
  }
  return offerElements;
};

const generatePictures = () => {
  const pictures = [];
  for (let i = 1; i <= 5; i++) {
    const pictureElement = {
      src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
      description: getRandomArrayElement(DESCRIPTIONS),
    };
    pictures.push(pictureElement);
  }
  return pictures;
};

export { getRandomArrayElement, getRandomInteger, generateOffers, generatePictures };
