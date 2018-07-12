import React from 'react';

import classes from './Toolbar.css'

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <div>MENU</div>
    <div>LOGO</div>
    <nav className={classes.name}>
      ...
    </nav>
  </header>
);

export default toolbar;