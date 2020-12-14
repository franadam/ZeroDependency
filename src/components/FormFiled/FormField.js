import React from 'react';
import PropTypes from 'prop-types';
import classes from './FormField.module.css';

const formField = ({ field, id, change }) => {
  const renderTemplate = () => {
    const showError = () => {
      const errorMessage = (
        <div className={classes.error}>
          {field.validation && !field.valid ? field.validationMessage : null}
        </div>
      );

      return errorMessage;
    };

    const formTemplate = (
      <>
        <input
          className={classes.fInput}
          {...field.config}
          id={id}
          onChange={(event) => change({ event, id })}
          value={field.value}
        />
        {showError()}
      </>
    );
    return formTemplate;
  };

  return <div className={classes.field}>{renderTemplate()}</div>;
};

formField.propTypes = {
  field: PropTypes.object,
  id: PropTypes.string,
  blur: PropTypes.func,
  change: PropTypes.func,
  submit: PropTypes.func,
  focus: PropTypes.func,
  keyUp: PropTypes.func,
};

export default formField;
