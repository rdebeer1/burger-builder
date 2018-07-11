import React, { Fragment, Component } from 'react';

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      meat: 0,
      cheese: 0,
      lettuce: 0,
      bacon: 0
    },
  }

  render () {
    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls />
      </Fragment>
    );
  }
}

export default BurgerBuilder;