import View from './view';
const icons = new URL('../../img/icons.svg', import.meta.url);

class ResultsView extends View {
  _parentEl = document.getElementById('results-container');

  constructor() {
    super();

    this._parentEl.addEventListener('click', e => {
      const clicked = e.target.closest('.preview__link');

      if (!clicked) return;

      [...this._parentEl.querySelectorAll('.preview__link')].forEach(el => {
        el.classList.remove('preview__link--active');
        if (el === clicked) el.classList.add('preview__link--active');
      });
    });
  }

  _generateMarkup(results) {
    return results.map(result => this._generateResultMarkup(result)).join('');
  }

  _generateResultMarkup(result) {
    const curId = window.location.hash.slice(1);

    return `
      <li class="preview">
        <a 
          class="preview__link 
            ${result.id === curId ? 'preview__link--active' : ''}" 
          href="#${result.id}"
          >
            <figure class="preview__fig">
              <img src="${result.imageUrl}" alt="Test" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${result.title}</h4>
              <p class="preview__publisher">${result.publisher}</p>
              
            </div>
        </a>
      </li>
    `;
  }
}

export default new ResultsView();
