import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Layout from '../../hoc/Layout/Layout';
import Home from '../Home/Home';

import classes from './App.module.css';

const App = () => {
  const routes = (
    <Switch>
      <Route path="/" exact component={Home} />
      <Redirect to="/" />
    </Switch>
  );
  return (
    <div data-test="component-app" className={classes.main}>
      <Layout>{routes}</Layout>
    </div>
  );
};

export default App;
