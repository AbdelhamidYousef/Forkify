import * as config from './config';
import * as helper from './helper';

/* ===========  State  =========== */
export const state = {
  recipe: {},
  results: {
    recipes: [],
    page: 1,
  },
  bookmarks: [],
};

/* ===========  Results  =========== */

// Fetching results
export const fetchResults = async function (query) {
  try {
    const data = await helper.fetchData(`${config.API_URL}?search=${query}`);

    if (data.results === 0)
      throw new Error('No recipes found for your query! Please try again ;)');

    state.results.recipes = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        imageUrl: recipe.image_url,
        publisher: recipe.publisher,
        title: recipe.title,
      };
    });
  } catch (err) {
    throw err;
  }
};

// Setting page
export const setPage = page => (state.results.page = page);

// Getting page of results
export const getPageResults = function () {
  const page = state.results.page;

  const start = (page - 1) * config.RESULTS_PER_PAGE,
    // page 1 => start = 0 | page 2 => start = 10 (included in slice)
    end = page * config.RESULTS_PER_PAGE;
  // page 1 => end = 10 (excluded in slice) | page 2 => end = 20

  return state.results.recipes.slice(start, end);
};

/* ===========  Recipe  =========== */

// Fetching recipe
export const fetchRecipe = async function (id) {
  try {
    const { data } = await helper.fetchData(`${config.API_URL}${id}`);

    state.recipe = {
      id: data.recipe.id,
      title: data.recipe.title,
      imageUrl: data.recipe.image_url,
      cookingTime: data.recipe.cooking_time,
      servings: data.recipe.servings,
      ingredients: data.recipe.ingredients,
      publisher: data.recipe.publisher,
      sourceUrl: data.recipe.source_url,
    };

    state.bookmarks.some(bookmark => bookmark.id === id)
      ? (state.recipe.bookmarked = true)
      : (state.recipe.bookmarked = false);
  } catch (err) {
    throw err;
  }
};

// Updating Servings & ingredients
export const updateServings = function (newServ) {
  state.recipe.ingredients.forEach(
    ing => (ing.quantity = ing.quantity * (newServ / state.recipe.servings))
  );

  state.recipe.servings = newServ;
};

// Toggling bookmark
export const toggleBookmark = function () {
  if (!state.recipe.bookmarked) state.bookmarks.push(state.recipe);

  if (state.recipe.bookmarked) {
    const index = state.bookmarks.findIndex(
      bookmark => bookmark.id === state.recipe.id
    );
    state.bookmarks.splice(index, 1);
  }

  state.recipe.bookmarked = !state.recipe.bookmarked;
};

// Saving bookmarks in localstorage
export const saveBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

// Getting bookmarks from localstorage
export const getBookmarks = function () {
  state.bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
};
