import React from 'react';
import PropTypes from 'prop-types';
import Rx from 'rxjs/Rx';
import findIndex from 'lodash/findIndex';
import {RADIX_DECIMAL} from '../utils/constants';

export default class Number extends React.Component {
  constructor() {
    super();

    this.state = {
      errors: []
    };
  }

  componentDidMount() {
    const element = this.refs.input;
    const input$ = Rx.Observable
      .fromEvent(element, 'keyup')
      .debounceTime(300)
      .map(event => parseInt(event.target.value, RADIX_DECIMAL))
      .startWith(this.props.value);

    // set state
    input$.subscribe(value => this.setState({ value }));

    const validators = [
      {
        type: 'value',
        isValid: value => value > 0,
        message: 'Must be a positive integer'
      }
    ];

    validators.forEach(validator => {
      const {isValid, type, message} = validator;

      input$
        .filter((value) => !isValid(value))
        .subscribe(() => {
          const {errors} = this.state;
          const alreadyInvalid = findIndex(errors, ['type', type]);

          if (alreadyInvalid === -1) {
            errors.push({ type, message });
            this.setState({ errors });
          }
        });

      // Remove error message when value is valid
      input$
        .filter((value) => isValid(value))
        .subscribe(() => {
          const errorIndex = findIndex(this.state.errors, ['type', type]);

          this.setState({
            errors: this.state.errors.filter((element, index) => index !== errorIndex)
          });
        });
    });
  }

  renderErrors() {
    const {errors} = this.state;
    const errorList = errors.map((error, index) => (
      <li key={index} className="errors__message">{error.message}</li>
    ));

    if (errors.length > 0) {
      return <ul className="errors">{errorList}</ul>;
    }
  }

  render() {
    const {id, placeholder, className, min, max, step} = this.props;

    return (
      <div className={className}>
        <input
          id={id}
          ref="input"
          type="number"
          placeholder={placeholder}
          min={min}
          max={max}
          step={step} />

        {this.renderErrors()}
      </div>
    );
  }
}

Number.defaultProps = {
  step: 1
}

Number.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  step: PropTypes.string,
  value: PropTypes.string
};
