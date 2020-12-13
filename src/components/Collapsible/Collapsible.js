import React from 'react';
import propTypes from 'prop-types';

import {
  FaTrashAlt,
  FaUserAlt,
  FaMapMarkerAlt,
  FaClipboard,
  FaImage,
  FaFileAlt,
} from 'react-icons/all';

import classes from './Collapsible.module.css';

const Collapsible = (props) => {
  const clik = (event) => {
    event.currentTarget.classList.toggle(classes.active);
    const content = event.currentTarget.nextElementSibling;
    content.classList.toggle(classes.active);
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  };

  const textFormat = (text) => {
    if (text.length > 20) {
      return text.slice(0, 20) + '...';
    }
    return text;
  };

  return (
    <div className={classes.main}>
      <div className={classes.header} onClick={(event) => clik(event)}>
        <div className={classes.name}>
          {props.type === 'user' ? <FaUserAlt /> : <FaClipboard />}{' '}
          {textFormat(props.name)}
        </div>
        {props.post ? (
          <div className={classes.post}>
            <FaFileAlt /> {props.post}
          </div>
        ) : null}
        {props.album ? (
          <div className={classes.album}>
            <FaImage /> {props.album}
          </div>
        ) : null}
        {props.completed !== undefined ? (
          <div
            className={`${
              props.completed ? classes.completed : classes.uncompleted
            }`}
          >
            Completed{' '}
          </div>
        ) : null}
        <div className={classes.delete} onClick={props.delete}>
          <FaTrashAlt />
        </div>
      </div>
      <div className={classes.content}>
        <p>{props.content}</p>
      </div>
    </div>
  );
};

Collapsible.propTypes = {
  name: propTypes.string,
  content: propTypes.string,
  post: propTypes.number,
  album: propTypes.number,
  type: propTypes.string,
  completed: propTypes.bool,
  delete: propTypes.func,
};

export default Collapsible;
