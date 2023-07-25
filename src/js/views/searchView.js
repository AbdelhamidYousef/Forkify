import View from './view';

class SearchView extends View {
  _parentEl = document.getElementById('search-form');

  addHandler(fn) {
    this._parentEl.addEventListener('submit', e => {
      e.preventDefault();
      fn();
    });
  }

  getQuery() {
    return this._parentEl.querySelector('#search-input').value;
  }

  clearInput() {
    this._parentEl.querySelector('#search-input').value = '';
  }
}

export default new SearchView();
