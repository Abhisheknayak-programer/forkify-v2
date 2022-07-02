import * as config from './config';
import * as helpers from './views/helpers';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (Recipe_id) {
  try {
    // 1. Loading Recipe
    const data = await helpers.getJSON(`${config.API_URL}/${Recipe_id}`);

    let recipe = data.data.recipe;
    // console.log(recipe);

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    // console.log(state.recipe);
  } catch (error) {
    console.log(error);
  }
};
