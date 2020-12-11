import React, { Component } from 'react';

import classes from './Home.module.css';

export class Home extends Component {
  render() {
    return (
      <div data-test="component-home" className={classes.main}>
        Home
      </div>
    );
  }
}

export default Home;
