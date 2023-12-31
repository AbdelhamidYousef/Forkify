import fraction from 'fractional';

import View from './view';
const icons = new URL('../../img/icons.svg', import.meta.url);

class RecipeView extends View {
  _parentEl = document.getElementById('recipes-container');

  addHandler(fn) {
    ['load', 'hashchange'].forEach(ev => window.addEventListener(ev, fn));
  }

  addHandlerServings(fn) {
    this._parentEl.addEventListener('click', e => {
      const clickedBtn = e.target.closest('#servings-btn');

      if (!clickedBtn) return;

      fn(+clickedBtn.dataset.newServ);
    });
  }

  addHandlerBookmark(fn) {
    this._parentEl.addEventListener('click', e => {
      const clickedBtn = e.target.closest('#bookmark-btn');

      if (!clickedBtn) return;

      fn();
    });
  }

  getRecipeId() {
    return window.location.hash.slice(1);
  }

  _generateMarkup(recipe) {
    return `
        <figure class="recipe__fig">
          <img src="${recipe.imageUrl}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipe.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>

          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">
              ${recipe.servings}
            </span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button 
                class="btn--tiny btn--increase-servings" 
                id="servings-btn"
                data-new-serv="${recipe.servings - 1}"
                >
                  <svg>
                    <use href="${icons}#icon-minus-circle"></use>
                  </svg>
              </button>
              <button 
                class="btn--tiny btn--increase-servings" 
                id="servings-btn"
                data-new-serv="${recipe.servings + 1}"
                >
                  <svg>
                    <use href="${icons}#icon-plus-circle"></use>
                  </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>

          <button class="btn--round" id="bookmark-btn">
            <svg class="">
              <use 
                href="${icons}#icon-bookmark${recipe.bookmarked ? '-fill' : ''}"
                >
              </use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${this._generateIngredientsMarkup(recipe.ingredients)}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              recipe.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;
  }

  _generateIngredientsMarkup(ingredients) {
    const markupMap = ingredients.map(ing => {
      return `       
          <li class="recipe__ingredient">
            <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${
              ing.quantity ? new Fraction(ing.quantity) : ''
            }</div>
            <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
            </div>
          </li>
          `;
    });

    return markupMap.join('');
  }
}

export default new RecipeView();
