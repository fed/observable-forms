import React from 'react';
import Bacon from 'baconjs';
import findIndex from 'lodash/findIndex';
import isEmail from '../../utils/isEmail';

export default class TextField extends React.Component {
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
    inputStream
      .onValue((value) => this.setState({value}));

    // email validation
    inputStream
      .filter((value) => !isEmail(value))
      .onValue(() => {
        const errors = this.state.errors;
        const alreadyInvalid = findIndex(errors, ['type', 'email']);

        if (alreadyInvalid === -1) {
          errors.push({type: 'email', message: 'Invalid email address'});
          this.setState({ errors });
        }
      });

    inputStream
      .filter((value) => isEmail(value))
      .onValue(() => {
        const errorIndex = findIndex(this.state.errors, ['type', 'email']);

        this.setState({
          errors: this.state.errors.filter((element, index) => index !== errorIndex)
        });
      });

    // length validation
    inputStream
      .filter((value) => value.length <= 3)
      .onValue(() => {
        const errors = this.state.errors;
        const alreadyInvalid = findIndex(errors, ['type', 'length']);

        if (alreadyInvalid === -1) {
          errors.push({type: 'length', message: 'Invalid length'});
          this.setState({ errors });
        }
      });

    inputStream
      .filter((value) => value.length > 3)
      .onValue(() => {
        const errorIndex = findIndex(this.state.errors, ['type', 'length']);

        this.setState({
          errors: this.state.errors.filter((element, index) => index !== errorIndex)
        });
      });
  }

  renderErrors() {
    const {errors} = this.state;

    if (errors.length > 0) {
      return (
        <ul>
          {errors.map((error, index) => <li key={index} className="error-message">{error.message}</li>)}
        </ul>
      );
    }
  }

  render() {
    const {label, type} = this.props;

    return (
      <fieldset>
        {label && <label htmlFor={name}>{label}</label>}
        <input ref="input" type={type} />
        {this.renderErrors()}
      </fieldset>
    );
  }
}

TextField.defaultProps = {
  type: 'text'
};

TextField.propTypes = {
  label: React.PropTypes.string,
  type: React.PropTypes.string
};
