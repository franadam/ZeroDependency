import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Layout from '../../hoc/Layout/Layout';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import CreateProfile from '../CreateProfile/CreateProfile';
import EditProfile from '../EditProfile/EditProfile';
import Post from '../Post/Post';

import classes from './App.module.css';

const App = () => {
  const routes = (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/users/add" exact component={CreateProfile} />
      <Route path="/users/:userID" exact component={Profile} />
      <Route path="/users/:userID/edit" exact component={EditProfile} />
      <Route path="/posts/compose" exact component={Post} />
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
