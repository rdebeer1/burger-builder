import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false
};

const purchaseBurgerStart = (state, action) => {
  return updateObject(state, {loading: true});
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, {id: action.orderId});
  return updateObject(state, {loading: false, orders: state.orders.concat(newOrder)});
};

const purchaseBurgerFailure = (state, action) => {
  return updateObject(state, {loading: false});
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAILURE: return purchaseBurgerFailure(state, action);
    default: return state;
  }
};

export default reducer;