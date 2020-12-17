import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { createUserInfo } from '../../store/actions';

import validate from '../../utils/validateForm';

import FormField from '../FormFiled/FormField';
import formStyle from '../FormFiled/FormField.module.css';
import classes from './CreateProfile.module.css';
import Modal from '../../hoc/Modal/Modal';

export class CreateProfile extends Component {
  state = {
    formError: false,
    formSuccess: '',
    formValid: false,
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'fullname',
          type: 'text',
          placeholder: 'Enter your fullname',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        touched: false,
      },
      username: {
        element: 'input',
        value: '',
        config: {
          name: 'bio',
          type: 'text',
          placeholder: 'Enter your username',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        touched: false,
      },
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email',
          type: 'email',
          placeholder: 'Enter your email',
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        validationMessage: '',
        touched: false,
      },
      street: {
        element: 'input',
        value: '',
        config: {
          name: 'street',
          type: 'text',
          placeholder: 'Enter your street',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        touched: false,
      },
      suite: {
        element: 'input',
        value: '',
        config: {
          name: 'suite',
          type: 'number',
          min: 1,
          placeholder: 'Enter your house number',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        touched: false,
      },
      city: {
        element: 'input',
        value: '',
        config: {
          name: 'city',
          type: 'text',
          placeholder: 'Enter your city',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        touched: false,
      },
      zipcode: {
        element: 'input',
        value: '',
        config: {
          name: 'zipcode',
          type: 'number',
          min: 1,
          placeholder: 'Enter your postal code',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        touched: false,
      },
      latitude: {
        element: 'input',
        value: '',
        config: {
          name: 'latitude',
          type: 'text',
          placeholder: 'Enter your latitude',
        },
        validation: {
          required: false,
        },
        valid: false,
        validationMessage: '',
        touched: false,
      },
      longitude: {
        element: 'input',
        value: '',
        config: {
          name: 'longitude',
          type: 'text',
          placeholder: 'Enter your longitude',
        },
        validation: {
          required: false,
        },
        valid: false,
        validationMessage: '',
        touched: false,
      },
      phone_number: {
        element: 'input',
        value: '',
        config: {
          name: 'phone_number',
          type: 'text',
          placeholder: 'Enter your phone number',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        touched: false,
      },
      website: {
        element: 'input',
        value: '',
        config: {
          name: 'website',
          type: 'text',
          placeholder: 'Enter your website',
        },
        validation: {
          required: false,
        },
        valid: false,
        validationMessage: '',
        touched: false,
      },
      company_name: {
        element: 'input',
        value: '',
        config: {
          name: 'company_name',
          type: 'text',
          placeholder: 'Enter your company name',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        touched: false,
      },
      company_catch_phrase: {
        element: 'input',
        value: '',
        config: {
          name: 'company_catch_phrase',
          type: 'text',
          placeholder: 'Enter your company catch phrase ',
        },
        validation: {
          required: false,
        },
        valid: false,
        validationMessage: '',
        touched: false,
      },
      company_bios: {
        element: 'input',
        value: '',
        config: {
          name: 'company_bs',
          type: 'text',
          placeholder: 'Enter your company bios',
        },
        validation: {
          required: false,
        },
        valid: false,
        validationMessage: '',
        touched: false,
      },
    },
  };

  createForm(formData) {
    const formElementsArray = [];
    for (const key in formData) {
      formElementsArray.push({
        id: key,
        config: formData[key],
      });
    }

    const formularField = formElementsArray.map((elem) => (
      <div className={formStyle.main} key={elem.id}>
        <label htmlFor={elem.id} className={formStyle.label}>
          {elem.id.split('_').join(' ')}
        </label>
        <FormField
          change={(event) => this.formFieldHandler(event)}
          field={elem.config}
          id={elem.id}
        />
      </div>
    ));

    return formularField;
  }

  formFieldHandler({ event, id }) {
    const newFormData = { ...this.state.formData },
      newElement = { ...newFormData[id] },
      element = event.currentTarget;

    newElement.value = element.value;

    const [valid, validationMessage] = validate(newElement);
    newElement.valid = valid;
    newElement.validationMessage = validationMessage;

    if (
      (event.target.value === '' && newElement.validation.required) ||
      (newElement.validation && !newElement.valid)
    ) {
      element.classList.add(formStyle.empty);
      element.parentElement.classList.add(formStyle.empty);
    } else {
      element.classList.remove(formStyle.empty);
      element.parentElement.classList.remove(formStyle.empty);
    }

    newFormData[id] = newElement;

    this.setState({
      formData: newFormData,
      formError: false,
    });
  }

  formSuccesManager(type) {
    const newFormData = { ...this.state.formData };

    for (const key in newFormData) {
      newFormData[key].value = '';
      newFormData[key].valid = false;
      newFormData[key].validationMessage = '';
    }

    this.clearSuccesMessage();

    this.setState({
      formData: newFormData,
      formError: false,
      formSuccess: type ? 'Congratulation' : 'This user already exists',
    });
  }

  clearSuccesMessage = () => {
    setTimeout(() => {
      this.setState({ formSuccess: '' });
    }, 2000);
  };

  handleSubmit(event) {
    event.preventDefault();

    const { formData } = this.state,
      dataToSubmit = {};
    let isValid = true;

    for (const key in formData) {
      if (formData[key].validation.required) {
        dataToSubmit[key] = formData[key].value;
        isValid = isValid && formData[key].valid;
      }
    }

    if (isValid) {
      const id = uuidv4();
      this.props.onCreateUserProfile({ id, ...dataToSubmit });

      this.props.history.push(`users/${id}`);
    } else {
      this.setState({ formError: true });
      document.getElementById('modal').style.display = 'block';
    }
  }
  render() {
    const form = (
      <form className={formStyle.form} onSubmit={this.handleSubmit}>
        {this.createForm(this.state.formData)}
        <button
          className={`${formStyle.btn} ${formStyle.submit}`}
          onClick={(event) => this.handleSubmit(event)}
          type="submit"
        >
          CREATE
        </button>
      </form>
    );

    return (
      <div className={classes.main}>
        <div className={classes.wrapper}>
          <h1 className={classes.title}>Create profile</h1>
          {form}
          <Modal>
            {this.state.formError ? (
              <p className={classes.error}>Please fill all fields properly</p>
            ) : null}
          </Modal>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onCreateUserProfile: (user) => dispatch(createUserInfo(user)),
});

CreateProfile.propTypes = {
  error: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,
  userID: PropTypes.string,
  onCreateUserProfile: PropTypes.func,
  onFetchUsers: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(withRouter(CreateProfile));
