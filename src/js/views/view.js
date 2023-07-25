const icons = new URL('../../img/icons.svg', import.meta.url);

class View {
  render(data) {
    this._clearParent();
    const markup = this._generateMarkup(data);
    this._appendToParent(markup);
  }

  update(data) {
    const curElements = this._parentEl.querySelectorAll('*');

    const newMarkup = this._generateMarkup(data),
      newDom = document.createRange().createContextualFragment(newMarkup),
      newElements = newDom.querySelectorAll('*');

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Updating text content
      if (
        newEl.firstChild?.nodeValue.trim() !== '' &&
        !newEl.isEqualNode(curEl)
      ) {
        if (curEl) curEl.textContent = newEl.textContent;
      }

      // Updating attributes
      if (!newEl.isEqualNode(curEl)) {
        [...newEl.attributes].forEach(attr =>
          curEl?.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner() {
    this._clearParent();

    const markup = `
            <div class="spinner">
                <svg>
                    <use href="${icons}#icon-loader"></use>
                </svg>
            </div>
        `;

    this._appendToParent(markup);
  }

  renderError(err) {
    this._clearParent();

    const markup = `
        <div class="error">
            <div>
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
            </div>
            <p>
            ${
              err.message.includes('Failed to fetch')
                ? 'Please, Check your internet connection!'
                : err.message.includes('Invalid _id')
                ? 'We could not find that recipe. Please try another one!'
                : err.message
            }
            </p>
        </div>    
    `;

    this._appendToParent(markup);
  }

  _clearParent() {
    this._parentEl.innerHTML = '';
  }

  _appendToParent(markup) {
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}

export default View;
