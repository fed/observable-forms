import React from 'react';
import PropTypes from 'prop-types';
import Bacon from 'baconjs';
import findIndex from 'lodash/findIndex';
import isEmail from '../utils/isEmail';

export default class Email extends React.Component {
  constructor() {
    super();

    this.state = {
      errors: []
    };
  }

  componentDidMount() {
    const element = this.refs.input;
    const inputStream = Bacon
      .fromEvent(element, 'keyup')
      .debounce(300)
      .map((event) => event.target.value);

    // set state
    inputStream.onValue((value) => this.setState({value}));

    const validators = [
      {type: 'email', isValid: isEmail, message: 'Invalid email address'},
      {type: 'length', isValid: (value) => value.length > 5, message: 'Gotta have at least six characters'}
    ];

    validators.forEach((validator) => {
      const {isValid, type, message} = validator;

      inputStream
        .filter((value) => !isValid(value))
        .onValue(() => {
          const errors = this.state.errors;
          const alreadyInvalid = findIndex(errors, ['type', type]);

          if (alreadyInvalid === -1) {
            errors.push({type, message});
            this.setState({errors});
          }
        });

      // Remove error message when value is valid
      inputStream
        .filter((value) => isValid(value))
        .onValue(() => {
          const errorIndex = findIndex(this.state.errors, ['type', type]);

          this.setState({
            errors: this.state.errors.filter((element, index) => index !== errorIndex)
          });
        });
    });
  }

  renderErrors() {
    const {errors} = this.state;
    const errorList = errors.map((error, index) => <li key={index} className="error-message">{error.message}</li>);

    if (errors.length > 0) {
      return <ul>{errorList}</ul>;
    }
  }

  render() {
    const {label} = this.props;

    return (
      <fieldset>
        {label && <label>{label}</label>}
        <input ref="input" type="email" />
        {this.renderErrors()}
      </fieldset>
    );
  }
}

Email.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string
};
