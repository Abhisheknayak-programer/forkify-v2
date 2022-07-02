import icons from 'url:../../img/icons.svg';

export default class View {
  data;
  render(data) {
    // CHECKING THE DATA IS THERE ALREADY OR NOT
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError(`Unable to find the recipe`);

    this.data = data;
    this.generateMarkup();
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', this.generateMarkup());
  }

  clear() {
    this.parentElement.innerHTML = '';
  }

  renderSpinner() {
    let markup = `<div class="spinner">
                        <svg>
                        <use href="${icons}#icon-loader"></use>
                        </svg>
                    </div>`;
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message) {
    let errorHtml = ` <div class="error">
                            <div>
                                <svg>
                                    <use href="s${icons}#icon-alert-triangle"></use>
                                </svg>
                            </div>
                            <p>${message}</p>
                        </div>`;
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', errorHtml);
  }
}
