import FiltersView from './view/filters-view.js';
import { render } from './framework/render.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointModel from './model/point-model.js';
import { generateFilter } from './mock/filter.js';

const siteMainElement = document.querySelector('.trip-events');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const pointModel = new PointModel();
const boardPresenter = new BoardPresenter(
  {
    boardContainer: siteMainElement,
    pointModel,
  }
);

const filters = generateFilter(pointModel.points);

render(new FiltersView({filters}), siteFilterElement);

boardPresenter.init();
