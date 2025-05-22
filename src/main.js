import FilterPresenter from './presenter/filter-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-point-button-view.js';
import PointsApiService from './points-api-server.js';
import { render } from './framework/render.js';

const AUTHORIZATION = 'Basic sS2sf774wcl2da9j';
const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

const siteMainElement = document.querySelector('.trip-events');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteHeaderElement = document.querySelector('.trip-main');
const pointModel = new PointModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter(
  {
    boardContainer: siteMainElement,
    pointModel,
    filterModel,
    onNewPointDestroy: handleNewPointFormClose
  }
);

const filterPresenter = new FilterPresenter({
  filterContainer: siteFilterElement,
  filterModel,
  pointModel
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

//render(newPointButtonComponent, siteHeaderElement);

boardPresenter.init();
filterPresenter.init();
pointModel.init()
  .finally(() => {
    render(newPointButtonComponent, siteHeaderElement);
  });
document.querySelector('.trip-main__event-add-btn').remove();
