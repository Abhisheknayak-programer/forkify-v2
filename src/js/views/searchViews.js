class SearchView {
  formElement = document.querySelector('.search');

  getQuery() {
    return this.formElement.querySelector('.search__field').value;
  }

  addHandlerSearch(handler) {
    this.formElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  clearInput() {
    this.formElement.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
