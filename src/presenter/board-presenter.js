import SortView from '../view/sort-view.js';
import EventView from '../view/event-view.js';
import EventsListView from '../view/events-list-view.js';
import BoardView from '../view/board-view.js';
import AddEventView from '../view/add-event-view.js';
import { render } from '../framework/render.js';
import { getRandomPoint } from '../mock/point.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointModel = null;

  #boardComponent = new BoardView();
  #eventListComponent = new EventsListView();
  #boardPoints = [];
  #renderPoint(point){
    const pointComponent = new AddEventView({
      point: this.point,
      offers: [...this.#pointModel.getOffersById(this.point.type, this.point)],
      destination:this.#pointModel.getDestinationsById(point.destination)
    });
    render(pointComponent,this.#eventListComponent.element);
  }

  constructor({boardContainer, pointModel}) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.boardPoints = [...this.#pointModel.points];
    render(this.#boardComponent, this.#boardContainer);
    render(new SortView(), this.#boardComponent.element);
    render(this.#eventListComponent, this.#boardComponent.element);
    render(new AddEventView({ point: this.boardPoints[0] }), this.#eventListComponent.element);

    for (let i = 0; i < 3; i++) {
      render(new EventView({ point: getRandomPoint() }), this.#eventListComponent.element);
    }

    for (let i = 1; i < this.#pointModel.length; i++){
      this.#renderPoint(this.#boardPoints[i]);
    }
  }
}
