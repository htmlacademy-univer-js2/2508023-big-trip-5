import { createElement } from '../render.js';

const createBoardTemplate = () => '<section class="terip-vents"></section>';

export default class BoardView {
  getTemplate() {
    return createBoardTemplate();
  }

  getElement(){
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeELemenet() {
    this.element = null;
  }
}
