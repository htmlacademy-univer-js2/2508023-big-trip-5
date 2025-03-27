import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
//import diff from 'dayjs';

dayjs.extend(utc);

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (items) => items[getRandomInteger(0, items.length - 1)];

const correctDateFormat = (date) => dayjs.utc(date).format('DD/MM/YY_HH:mm');

const extractDate = (date) => dayjs.utc(date).format('MMM DD');

const extractTime = (date) => dayjs.utc(date).format('HH:mm');

const calculateFlightTime = (startTime, endTime, unit = 'm') =>{
  const difference = dayjs(endTime).diff(dayjs(startTime), unit);
  const hours = Math.floor(difference / 60);
  if (difference < 60){
    return `${difference}M`;
  }
  return `${hours}H ${difference - hours * 60}M`;
};
/*
const w = dayjs('2025-04-14T20:18:12.653Z');
const e = dayjs('2025-04-15T01:35:13.536Z');
// eslint-disable-next-line no-console
console.log(calculateFlightTime(w,e));*/

export { getRandomArrayElement, getRandomInteger, correctDateFormat, extractDate, extractTime, calculateFlightTime };
