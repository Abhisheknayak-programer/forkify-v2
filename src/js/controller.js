import * as model from './model';
import recipeViews from './views/recipeViews';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchViews from './views/searchViews';
import resultsView from './views/resultsView';

const controlRecipes = async function () {
  try {
    // FINDING THE HASH AND REMOVING ID FROM THAT AND THEN FETCHING
    const Recipe_id = window.location.hash.slice(1);
    if (!Recipe_id) return;

    // RENDERING THE SPINNER
    recipeViews.renderSpinner();

    // 1. Loading Recipe
    await model.loadRecipe(Recipe_id);
    const recipe = model.state.recipe;

    // 2. Rendering Recipe
    recipeViews.render(recipe);
  } catch (error) {
    recipeViews.renderError(
      `💥Error fetching recipe please try again later! 💥`
    );
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1. Get Search Query and Clear Input Field
    const query = searchViews.getQuery();
    if (!query) return;
    searchViews.clearInput();

    // 2. Load Search Results
    await model.loadSearchResults(query);

    // 3. Rendering the results
    resultsView.render(model.state.search.results);
  } catch (error) {
    recipeViews.renderError(
      `💥Error fetching recipe please try again later! 💥`
    );
  }
};

const init = function () {
  recipeViews.addHandlerRender(controlRecipes);
  searchViews.addHandlerSearch(controlSearchResults);
};

init();
