import { FILTER_TYPE } from '../const';
import { isEventAfter, isEventBefore } from './point';

const filter = {
  [FILTER_TYPE.EVERYTHING]: (points) => points,
  [FILTER_TYPE.FUTURE]: (points) => points.filter((point) => isEventAfter(point.dateFrom)),
  [FILTER_TYPE.PRESENT]: (points) => points.filter((point) => isEventBefore(point.dateTo) && isEventAfter(point.dateFrom)),
  [FILTER_TYPE.PAST]: (points) => points.filter((point) => isEventBefore(point.dateTo)),
};

export { filter };
