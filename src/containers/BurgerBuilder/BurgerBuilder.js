import React, { Fragment, Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
  bacon: 0.85,
  lettuce: 0.00,
  cheese: 0.25,
  meat: 1.10,
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      bacon: 0,
      lettuce: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 1.25,
    purchasable: false,
    purchasing: false,
    loading: false
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice, 
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  }
  
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({
      totalPrice: newPrice, 
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  }
  
  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);
    this.setState({
      purchasable: sum > 0
    });
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  }

  purchaseContinueHandler = () => {
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Robert DeBeer',
        address: {
          street: '1330 Market Street',
          zipCode: '92101',
          state: 'California',
        },
        email: 'test@gmail.com'
      },
      forDelivery: 'yes'
    }
    axios.post('/orders.json', order)
    .then(response => {
      this.setState({
        loading: false,
        purchasing: false
      })
    })
    .catch(error => {
      this.setState({
        loading: false,
        purchasing: false
      })
    });
  }

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = <OrderSummary
      ingredients={this.state.ingredients}
      purchasedCancelled={this.purchaseCancelHandler}
      purchasedContinued={this.purchaseContinueHandler}
      price={this.state.totalPrice} />;
    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Fragment>
        <Modal 
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler} 
          disabled={disabledInfo} 
          price={this.state.totalPrice}
          purchasable={this.state.purchasable} 
          ordered={this.purchaseHandler} />
      </Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);