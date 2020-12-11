import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Navbar.module.css';
const Navbar = () => {
  return (
    <nav data-test="component-navbar" className={classes.main}>
      <div className={classes.wrapper}>
        <Link to="#" className={`${classes.header} ${classes.lk}`}>
          <img
            className={classes.logo}
            src="https://uploads-ssl.webflow.com/5f71d647c56bcf4dbf70403e/5fb2807a2db89f291f29b9ed_zerodependency_symbol.png"
            alt="logo"
          />
          <h2 className={classes.title}>Zero Dependency</h2>
        </Link>
        <ul id="nav-mobile" className={classes.links}>
          <li>
            <Link className={classes.lk} to="sass.html">
              Users
            </Link>
          </li>
          <li>
            <Link className={classes.lk} to="badges.html">
              Posts
            </Link>
          </li>
          <li>
            <Link className={classes.lk} to="collapsible.html">
              Albums
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
