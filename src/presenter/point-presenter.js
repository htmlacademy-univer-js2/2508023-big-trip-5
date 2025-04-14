import { replace, render } from '../framework/render';
import AddEventView from '../view/add-event-view';
import EventView from '../view/event-view';

export default class PointPresenter{
  #pointListContainer = null;

  #eventViewComponent = null;
  #pointComponent = null;

  #point = null;

  constructor({pointListContainer}){
    this.#pointListContainer = pointListContainer;
  }

  init(point){
    this.#point = point;

    this.#eventViewComponent = new EventView({
      point: point,
      onOpenEventClick: () => {
        this.#replacePointToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    this.#pointComponent = new AddEventView({
      point: point,
      onFormSubmit: () => {
        this.#replaceFormToPoint();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      }
    });


    render(this.#eventViewComponent, this.#pointListContainer);
  }


  #replacePointToForm() {
    replace(this.#pointComponent, this.#eventViewComponent);
  }

  #replaceFormToPoint() {
    replace(this.#eventViewComponent, this.#pointComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };
}
