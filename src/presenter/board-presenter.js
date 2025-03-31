import SortView from '../view/sort-view.js';
import EventView from '../view/event-view.js';
import EventsListView from '../view/events-list-view.js';
import BoardView from '../view/board-view.js';
import AddEventView from '../view/add-event-view.js';
import { render, replace} from '../framework/render.js';
import NoPointView from '../view/no-point-view.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointModel = null;

  #boardComponent = new BoardView();
  #eventListComponent = new EventsListView();
  #boardPoints = [];
  #renderPoint(point){
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const eventViewComponent = new EventView({
      point: point,
      onOpenEventClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointComponent = new AddEventView({
      point: point,
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(pointComponent, eventViewComponent);
    }

    function replaceFormToPoint() {
      replace(eventViewComponent, pointComponent);
    }

    render(eventViewComponent, this.#eventListComponent.element);
  }

  #renderBoard(){
    render(this.#boardComponent, this.#boardContainer);

    if (this.#boardPoints.every((point) => point.isArchive)) {
      render(new NoPointView(), this.#boardComponent.element);
      return;
    }


    render(new SortView(), this.#boardComponent.element);
    render(this.#eventListComponent, this.#boardComponent.element);

    for (let i = 0; i < this.#pointModel.points.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
  }

  constructor({boardContainer, pointModel}) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#boardPoints = [...this.#pointModel.points];
    this.#renderBoard();
  }
}
