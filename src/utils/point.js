import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const correctDateFormat = (date) => dayjs.utc(date).format('DD/MM/YY_HH:mm');

const extractDate = (date) => dayjs.utc(date).format('MMM DD');

const extractTime = (date) => dayjs.utc(date).format('HH:mm');

const isEventAfter = (date) => date && dayjs().isAfter(date, 'D');

const isEventBefore = (date) => date && dayjs().isBefore(date, 'D');


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

const calculateDurationInMinutes = (dateFrom, dateTo) => dayjs(dateTo).diff(dateFrom, 'minute');

const sortPointByTime = (pointA, pointB) => {
  const durationA = calculateDurationInMinutes(pointA.dateFrom, pointA.dateTo);
  const durationB = calculateDurationInMinutes(pointB.dateFrom, pointB.dateTo);

  return durationB - durationA;
};

const sortPointByPrice = (pointA, pointB) => pointB.price - pointA.price;

export { correctDateFormat, extractDate, extractTime, calculateFlightTime, isEventAfter, isEventBefore, sortPointByPrice, sortPointByTime };
