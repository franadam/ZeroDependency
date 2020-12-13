import React from 'react';
import PropTypes from 'prop-types';

import classes from './Modal.module.css';

const Modal = (props) => {
  // Get the modal
  var modal = document.getElementById('modal');

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
  const spanHandler = () => {
    modal.style.display = 'none';
    if (props.actions) {
      props.actions();
    }
  };
  return (
    <div id="modal" className={classes.main}>
      <div className={classes.content}>
        <span className={classes.close} onClick={() => spanHandler()}>
          &times;
        </span>
        <div className={classes.children}>{props.children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.object,
  actions: PropTypes.func,
};

export default Modal;
