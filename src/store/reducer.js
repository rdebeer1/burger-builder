import * as actionTypes from './actions';

const initialState = {
  ingredients: {
    bacon: 0,
    lettuce: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 1.25
};

const INGREDIENT_PRICES = {
  bacon: 0.85,
  lettuce: 0.00,
  cheese: 0.25,
  meat: 1.10,
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };
    default:
      return state;
  }
};

export default reducer;