import React from 'react';
import { Link } from 'react-router-dom';

import propTypes from 'prop-types';

import classes from './Card.module.css';

const Card = (props) => {
  return (
    <div className={classes.main}>
      <div className={classes.wrapper}>
        <div className={classes.text}>
          <h3 className={classes.title}>{props.title}</h3>
          <p className={classes.body}>{props.body}</p>
        </div>
        <div className={classes.links}>
          <div type="button" className={classes.delete} onClick={props.delete}>
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: propTypes.string,
  body: propTypes.string,
  delete: propTypes.func,
};

export default Card;
