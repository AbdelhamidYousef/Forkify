import core from 'core-js';

import * as model from './model';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
import bookmarksView from './views/bookmarksView';

if (module.hot) {
  module.hot.accept();
}

/* =========== API =========== */
// forkify API Documentation: https://forkify-api.herokuapp.com/v2

/* =========== Controlling Results  =========== */

// Controlling pagination view
const controlPage = function (togoPage) {
  // Set page
  model.setPage(togoPage);

  // Render page of results
  const pageResults = model.getPageResults();
  resultsView.render(pageResults);

  // Rendering pagination
  paginationView.render(model.state.results);
};

// Controlling results view
const controlResults = async function (query) {
  // Rendering spinner
  resultsView.renderSpinner();

  try {
    // Fetching results data
    await model.fetchResults(query);
    // Render first page
    controlPage(1);
  } catch (err) {
    // Rendering error
    resultsView.renderError(err);
  }
};

// Controlling search view
const controlSearch = function () {
  // Getting search query
  const query = searchView.getQuery();
  if (!query) return;
  // Clearing input
  searchView.clearInput();
  // Calling control results
  controlResults(query);
};

/* =========== Controlling Recipe  =========== */

// Controlling recipe view
const controlRecipe = async function () {
  // Get recipe id
  const recipeId = recipeView.getRecipeId();
  if (!recipeId) return;
  // Rendering spinner
  recipeView.renderSpinner();
  // Updating results (to update active link)
  // resultsView.update(model.state.results.recipes);

  try {
    // Fetching recipe data
    await model.fetchRecipe(recipeId);
    // Rendering recipe data
    recipeView.render(model.state.recipe);
    // Update bookmarks
    bookmarksView.update(model.state.bookmarks); 
  } catch (err) {
    // Rendering error
    recipeView.renderError(err);
  }
};

// Controlling Servings
const controlServings = function (newServ) {
  if (newServ < 1 || newServ > 25) return;

  model.updateServings(newServ);

  recipeView.update(model.state.recipe);
};

// Controlling toggling bookmarks
const controlBookmarks = function () {
  model.toggleBookmark();

  model.saveBookmarks();

  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
};

// Getting bookmarks on load
const getBookmarks = function () {
  model.getBookmarks();

  bookmarksView.render(model.state.bookmarks);
};



/* =========== Init =========== */

// Init function for event handling
const init = function () {
  searchView.addHandler(controlSearch);
  paginationView.addHandler(controlPage);
  recipeView.addHandler(controlRecipe);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookmark(controlBookmarks);
  getBookmarks();

  
};
init();
