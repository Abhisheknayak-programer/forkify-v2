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

const createRecipeObject = function (data) {
  const recipe = data.data.recipe;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (Recipe_id) {
  try {
    // 1. Loading Recipe
    const data = await helpers.getJSON(
      `${config.API_URL}/${Recipe_id}?key=${config.API_KEY}`
    );

    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some(bookmark => bookmark.id === Recipe_id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }

    // console.log(state.recipe);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await helpers.getJSON(
      `${config.API_URL}?search=${query}&key=${config.API_KEY}`
    );

    const AllRecipes = data.data.recipes;
    state.search.results = AllRecipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.page = 1;
  } catch (error) {
    console.error(error);
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
    const ingredients = Object.entries(newRecipe)
      .filter(ing => ing[0].startsWith('ingredient') && ing[1] !== '')
      .map(ingredient => {
        const ingArr = ingredient[1].split(',').map(el => el.trim());

        if (ingArr.length !== 3) {
          throw new Error(
            `Please use the correct fromat only while uploading a recipe`
          );
        }

        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await helpers.postJSON(
      `${config.API_URL}?key=${config.API_KEY}`,
      recipe
    );

    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
