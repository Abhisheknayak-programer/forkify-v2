import icons from 'url:../../img/icons.svg';

export default class View {
  data;
  render(data) {
    // CHECKING THE DATA IS THERE ALREADY OR NOT
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError(`Unable to find the recipe`);

    this.data = data;
    const markup = this.generateMarkup();
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this.data = data;
    const newMarkup = this.generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currentElements = Array.from(
      this.parentElement.querySelectorAll('*')
    );

    newElements.forEach((newEl, ind) => {
      const curEL = currentElements[ind];

      if (
        !newEl.isEqualNode(curEL) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEL.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEL)) {
        Array.from(newEl.attributes).forEach(attribute => {
          curEL.setAttribute(attribute.name, attribute.value);
        });
      }
    });
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
                                    <use href="${icons}#icon-alert-triangle"></use>
                                </svg>
                            </div>
                            <p>${message}</p>
                        </div>`;
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', errorHtml);
  }
}
