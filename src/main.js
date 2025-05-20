//import FiltersView from './view/filters-view.js';
import FilterPresenter from './presenter/filter-presenter.js';
//import { render } from './framework/render.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';

const siteMainElement = document.querySelector('.trip-events');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const pointModel = new PointModel();
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter(
  {
    boardContainer: siteMainElement,
    pointModel,
    filterModel,
  }
);

const filterPresenter = new FilterPresenter({
  filterContainer: siteFilterElement,
  filterModel,
  pointModel
});

boardPresenter.init();
filterPresenter.init();
