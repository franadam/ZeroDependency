import React from 'react';
import PropTypes from 'prop-types';

import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';

import classes from './Layout.module.css';

const Layout = (props) => {
  return (
    <div data-test="component-layout" className={classes.main}>
      <Navbar />
      <div className={classes.content}>{props.children}</div>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
