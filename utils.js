import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

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
  const days = Math.floor(hours / 24);

  if (difference < 60){
    return `${difference}M`;
  }else if (hours < 24){
    return `${hours}H ${difference - hours * 60}M`;
  }else{
    return `${days}D ${hours}H ${difference - hours * 60}M`;
  }
};

export { getRandomArrayElement, getRandomInteger, correctDateFormat, extractDate, extractTime, calculateFlightTime };
