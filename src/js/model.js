import * as config from './config';
import * as helpers from './views/helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: config.RESULTS_PER_PAGE,
    page: 1,
  },
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
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await helpers.getJSON(`${config.API_URL}?search=${query}`);

    const AllRecipes = data.data.recipes;
    state.search.results = AllRecipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  let start = (page - 1) * state.search.resultsPerPage;
  let end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};
