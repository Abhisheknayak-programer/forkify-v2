import * as model from './model';
import recipeViews from './views/recipeViews';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
const RecipeContainer = document.querySelector('.recipe');

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

const init = function () {
  recipeViews.addHandlerRender(controlRecipes);
};

init();
