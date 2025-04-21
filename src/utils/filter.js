import { FilterType } from '../const';
import { isEventAfter, isEventBefore } from './point';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isEventAfter(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isEventBefore(point.dateTo) && isEventAfter(point.dateFrom)),
  [FilterType.PAST]: (points) => points.filter((point) => isEventBefore(point.dateTo)),
};

export { filter };
