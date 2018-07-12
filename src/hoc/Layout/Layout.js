import React, { Fragment, Component } from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import classes from './Layout.css'

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerCosedHandler = () => {
    this.setState({
      showSideDrawer: false
    });
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {
        showSideDrawer: !prevState.showSideDrawer
      }
    });
  }

  render() {
    return(
      <Fragment>
        <Toolbar 
          drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerCosedHandler} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Fragment>
    );
  }
}

export default Layout;