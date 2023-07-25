import View from './view';
import * as config from '../config';

const icons = new URL('../../img/icons.svg', import.meta.url);

class PaginationView extends View {
  _parentEl = document.getElementById('pagination-container');

  _generateMarkup(results) {
    const numPages = Math.ceil(
        results.recipes.length / config.RESULTS_PER_PAGE
      ),
      page = results.page;

    let prevMarkup, nextMarkup;

    if (page === 1) prevMarkup = '';
    else prevMarkup = this._generatePrevMarkup(page);

    if (page === numPages) nextMarkup = '';
    else nextMarkup = this._generateNextMarkup(page);

    return prevMarkup + nextMarkup;
  }

  _generatePrevMarkup(page) {
    return `
        <button 
          class="btn--inline pagination__btn--prev" 
          id="pagination-btn" 
          data-togo="${page - 1}"
          >
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>page ${page - 1}</span>
        </button>
        `;
  }

  _generateNextMarkup(page) {
    return `
        <button 
          class="btn--inline pagination__btn--next" 
          id="pagination-btn" 
          data-togo="${page + 1}">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
            <span>page ${page + 1}</span>
        </button>
        `;
  }

  addHandler(fn) {
    this._parentEl.addEventListener('click', e => {
      const clickedBtn = e.target.closest('#pagination-btn');

      if (!clickedBtn) return;

      fn(+clickedBtn.dataset.togo);
    });
  }
}

export default new PaginationView();
