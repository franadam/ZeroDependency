import React from 'react';
import propTypes from 'prop-types';

import { FaTrashAlt, FaUserAlt, FaClipboard, FaFileAlt } from 'react-icons/all';

import classes from './Collapsible.module.css';
import { Link } from 'react-router-dom';

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
    if (text && text.length > 20) {
      return text.slice(0, 20) + '...';
    }
    return text;
  };

  const name = (
    <>
      {props.type === 'user' ? <FaUserAlt /> : <FaClipboard />}{' '}
      {textFormat(props.name)}
    </>
  );

  return (
    <div className={classes.main}>
      <div className={classes.header} onClick={(event) => clik(event)}>
        {props.link ? (
          <Link className={classes.name} to={props.link}>
            {name}
          </Link>
        ) : (
          <div className={classes.name}>{name}</div>
        )}
        {typeof props.post !== 'undefined' ? (
          <div className={classes.post}>
            <FaFileAlt /> {props.post}
          </div>
        ) : null}
        {typeof props.todo !== 'undefined' ? (
          <div className={classes.todo}>
            <FaClipboard /> {props.todo}
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
      <div className={classes.content}>{props.content}</div>
    </div>
  );
};

Collapsible.propTypes = {
  name: propTypes.string,
  link: propTypes.string,
  content: propTypes.object,
  post: propTypes.number,
  todo: propTypes.number,
  type: propTypes.string,
  completed: propTypes.bool,
  delete: propTypes.func,
};

export default Collapsible;
