import View from './View';

class AddRecipeView extends View {
  parentElement = document.querySelector('.upload');
  addRecipeWindow = document.querySelector('.add-recipe-window');
  overlay = document.querySelector('.overlay');
  btnAddRecipe = document.querySelector('.nav__btn--add-recipe');
  btnCloseModal = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this.addHandlerShowWindow();
    this.addHandlerHideWindow();
  }

  toggleWindow() {
    this.addRecipeWindow.classList.toggle('hidden');
    this.overlay.classList.toggle('hidden');
  }

  addHandlerShowWindow() {
    this.btnAddRecipe.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerHideWindow() {
    this.btnCloseModal.addEventListener('click', this.toggleWindow.bind(this));
    this.overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this.parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  generateMarkup() {}
}

export default new AddRecipeView();
