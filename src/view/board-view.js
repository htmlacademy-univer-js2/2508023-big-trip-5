import AbstractView from '../framework/view/abstract-view.js';

const createBoardTemplate = () => '<section class="terip-vents"></section>';

export default class BoardView extends AbstractView{
  get template() {
    return createBoardTemplate();
  }
}
