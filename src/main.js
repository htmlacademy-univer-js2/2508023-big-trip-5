import FiltersView from './view/filters-view.js';
import { render } from '../src/render.js';
import BoardPresenter from './presenter/board-presenter.js';

const siteMainElement = document.querySelector('.trip-events');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const boardPresenter = new BoardPresenter({boardContainer: siteMainElement});

render(new FiltersView(), siteFilterElement);

boardPresenter.init();
