import { replace, render, remove } from '../framework/render';
import AddEventView from '../view/add-event-view';
import EventView from '../view/event-view';

export default class PointPresenter{
  #pointListContainer = null;
  #handleDataChange = null;

  #eventViewComponent = null;
  #pointComponent = null;

  #point = null;

  constructor({pointListContainer, onDataChange}){
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
  }

  init(point){
    this.#point = point;

    const prevEventViewComponent = this.#eventViewComponent;
    const prevPointComponent = this.#pointComponent;

    this.#eventViewComponent = new EventView({
      point: this.#point,
      onOpenEventClick: () => {
        this.#replacePointToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      },
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointComponent = new AddEventView({
      point: this.#point,
      onFormSubmit: () => {
        this.#handleDataChange(this.#point);
        this.#replaceFormToPoint();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    if (prevEventViewComponent === null || prevEventViewComponent === null){
      render(this.#eventViewComponent, this.#pointListContainer);
      return;
    }

    if (this.#pointListContainer.contains(prevEventViewComponent.element)){
      replace(this.#eventViewComponent, prevEventViewComponent);
    }

    if (this.#pointListContainer.contains(prevPointComponent.element)){
      replace(this.#eventViewComponent, prevPointComponent);
    }

    remove(prevEventViewComponent);
    remove(prevPointComponent);
  }

  destroy(){
    remove(this.#eventViewComponent);
    remove(this.#pointComponent);
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

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
