import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const correctDateFormat = (date) => dayjs(date).format('DD/MM/YY HH:mm');

const extractDate = (date) => dayjs(date).format('MMM DD');

const extractTime = (date) => dayjs(date).format('HH:mm');

const isEventAfter = (date) => date && dayjs(date).isAfter(dayjs());

const isEventBefore = (date) => date && dayjs(date).isBefore(dayjs());


const calculateFlightTime = (startTime, endTime, unit = 'm') =>{
  const difference = dayjs(endTime).diff(dayjs(startTime), unit);
  const hours = Math.floor(difference / 60);
  const days = Math.floor(hours / 24);

  if (difference < 60){
    return `${difference}M`;
  }else if (hours < 24){
    return `${hours}H ${difference - hours * 60}M`;
  }else{
    return `${days}D ${hours - days * 24}H ${difference - hours * 60}M`;
  }
};

const calculateDurationInMinutes = (dateFrom, dateTo) => dayjs(dateTo).diff(dateFrom, 'minute');

const sortByDate = (events) => events.slice().sort((a, b) => a.dateFrom - b.dateFrom);
const createDateTemplate = (dateFrom, format) => dayjs(dateFrom).format(format);

const sortPointByTime = (pointA, pointB) => {
  const durationA = calculateDurationInMinutes(pointA.dateFrom, pointA.dateTo);
  const durationB = calculateDurationInMinutes(pointB.dateFrom, pointB.dateTo);

  return durationB - durationA;
};

const sortPointByPrice = (pointA, pointB) => pointB.price - pointA.price;

const sortPointByDay = (pointA, pointB) => {
  const dateA = dayjs(pointA.dateFrom, 'MMM DD');
  const dateB = dayjs(pointB.dateFrom, 'MMM DD');

  if (dateA.isBefore(dateB)) {
    return -1;
  } else if (dateA.isAfter(dateB)) {
    return 1;
  } else {
    return 0;
  }
};

export { correctDateFormat, extractDate, extractTime, sortByDate, createDateTemplate, calculateFlightTime, isEventAfter, isEventBefore, sortPointByPrice, sortPointByTime, sortPointByDay };
