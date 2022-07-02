import View from './View';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this.parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }

  generateMarkup() {
    const totalNumPages = Math.ceil(
      this.data.results.length / this.data.resultsPerPage
    );

    // PAGE 1 AND OTHER PAGES ARE THERE
    if (this.data.page === 1 && totalNumPages > 1) {
      return `<button data-goto="${
        this.data.page + 1
      }" class="btn--inline pagination__btn--next">
                    <span>Page ${this.data.page + 1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>`;
    }

    // LAST PAGE
    if (this.data.page === totalNumPages && totalNumPages > 1) {
      return `<button data-goto="${
        this.data.page - 1
      }" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${this.data.page - 1}</span>
               </button>`;
    }

    // OTHER PAGE
    if (this.data.page < totalNumPages) {
      return `<button data-goto="${
        this.data.page - 1
      }" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${this.data.page - 1}</span>
                </button>

                <button data-goto="${
                  this.data.page + 1
                }" class="btn--inline pagination__btn--next">
                    <span>Page ${this.data.page + 1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>`;
    }

    // PAGE 1 AND THERE ARE NO PAGES
    return '';
  }
}

export default new ResultsView();
