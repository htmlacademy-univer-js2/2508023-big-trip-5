import { replace, render, remove } from '../framework/render';
import { UserAction, UpdateType } from '../const.js';
import AddEventView from '../view/add-event-view';
import EventView from '../view/event-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
export default class PointPresenter{
  #pointListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #eventViewComponent = null;
  #pointComponent = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor({pointListContainer, onDataChange, onModeChange}){
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point, offers, destinations) {
    this.#point = point;

    const prevEventViewComponent = this.#eventViewComponent;
    const prevPointComponent = this.#pointComponent;

    this.#eventViewComponent = new EventView({
      point: this.#point,
      possibleOffers: offers,
      onOpenEventClick: () => {
        this.#replacePointToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      },
      onFavoriteClick: this.#handleFavoriteClick,
    });

    if (!this.#pointComponent) {
      this.#pointComponent = new AddEventView({
        point: this.#point,
        possibleDestinations: destinations,
        possibleOffers: offers,
        onFormSubmit: this.#handleFormSubmit,
        onDeleteClick: this.#handleDeleteClick,
      });
    }

    if (prevEventViewComponent === null && prevPointComponent === null) {
      render(this.#eventViewComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevEventViewComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, prevPointComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevEventViewComponent);
    remove(prevPointComponent);
  }

  destroy(){
    remove(this.#eventViewComponent);
    remove(this.#pointComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#pointComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#pointComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#eventViewComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#pointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointComponent.shake(resetFormState);
  }

  #replacePointToForm() {
    replace(this.#pointComponent, this.#eventViewComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#eventViewComponent, this.#pointComponent);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleFormSubmit = (update) => {
    const isPatchUpdate = (this.#point.type !== update.type) || (this.#point.destination !== update.destination);
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isPatchUpdate ? UpdateType.PATCH : UpdateType.MINOR,
      update
    );
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
