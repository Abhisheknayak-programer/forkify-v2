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
  bookmarks: [],
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

    if (state.bookmarks.some(bookmark => bookmark.id === Recipe_id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }

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
    state.search.page = 1;
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

export const updateServings = function (servings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * servings) / state.recipe.servings;
  });

  state.recipe.servings = servings;
};

const storeBoomarkToLocalStorage = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // ADD CURRENT RECIPE TO BOOKMARKS
  state.bookmarks.push(recipe);

  // MARK THE RECIPE AS BOOKMARK
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
  storeBoomarkToLocalStorage();
};

export const deleteBookmark = function (id) {
  // DELETE BOOKMARK
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(index, 1);

  // MARK THE RECIPE AS NOT BOOKMARK
  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }
  storeBoomarkToLocalStorage();
};

const init = function () {
  const Local_Storage_Bookmarks = localStorage.getItem('bookmarks');
  if (Local_Storage_Bookmarks) {
    state.bookmarks = JSON.parse(Local_Storage_Bookmarks);
  }
};
init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();

export const uploadRecipe = async function (newRecipe) {
  try {


  } catch (err) {
    console.error(err);
    throw err;
  }
};
