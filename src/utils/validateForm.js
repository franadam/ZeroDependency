import validator from 'validator';

const validate = (element) => {
  let error = [true, ''];

  if (element.validation.email) {
    const valid = validator.isEmail(element.value),
      message = `${!valid ? 'Please enter a valid email' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.required) {
    const valid = element.value.trim() !== '',
      message = `${
        !valid ? `The ${element.config.name} field is required` : ''
      }`;
    error = !valid ? [valid, message] : error;
  }
  if (element.config.name === 'phone_number') {
    const valid = validator.isMobilePhone(element.value),
      message = `${!valid ? 'Please enter a valid phone number' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  return error;
};

export default validate;
