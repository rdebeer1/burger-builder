import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 1.25,
  error: false
};

const INGREDIENT_PRICES = {
  lettuce: 0.00,
  bacon: 0.85,
  cheese: 0.25,
  meat: 1.10,
}

const addIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    },
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
  });
};

const removeIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    },
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
  });
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
        lettuce: action.ingredients.lettuce,
        bacon: action.ingredients.bacon,
        cheese: action.ingredients.cheese,
        meat: action.ingredients.meat
      },
      totalPrice: 1.25,
      error: false
  });
};

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, {
    error: true
  });
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
    default:return state;
  }
};

export default reducer;