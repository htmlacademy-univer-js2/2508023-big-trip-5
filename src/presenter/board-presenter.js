import SortView from '../view/sort-view.js';
import EventView from '../view/event-view.js';
import EditEventView from '../view/edit-event-view.js';
import EventsListView from '../view/events-list-view.js';
import BoardView from '../view/board-view.js';
import AddEventView from '../view/add-event-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  boardComponent = new BoardView();
  eventListComponent = new EventsListView();

  constructor({boardContainer, pointModel}) {
    this.boardContainer = boardContainer;
    this.pointModel = pointModel;
  }

  init() {
    this.boardPoints = [...this.pointModel.getPoints()];
    render(this.boardComponent, this.boardContainer);
    render(new SortView(), this.boardComponent.getElement());
    render(this.eventListComponent, this.boardComponent.getElement());
    render(new EditEventView(), this.eventListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventView(), this.eventListComponent.getElement());
    }

    for (let i = 1; i < this.eventsListPoints.length; i++){
      const point = new this.EventEditView({
        point: this.boardPoints[i],
        offers: [...this.pointModel.getOffersById(this.boardPoints[i].type, this.boardPoints[i])],
        destination:this.pointModel.getDestinationsById(this.boardPoints[i].destination)
      });
      render(point,this.eventListComponent.getElement());
    }
    render(new AddEventView(), this.eventListComponent.getElement());
  }
}
