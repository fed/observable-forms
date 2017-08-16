import React from 'react';
import PropTypes from 'prop-types';
import Rx from 'rxjs/Rx';
import findIndex from 'lodash/findIndex';

export default class Text extends React.Component {
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
      .map(event => event.target.value)
      .startWith('');

    // set state
    input$.subscribe(value => this.setState({ value }));

    const validators = [
      {
        type: 'length',
        isValid: value => value.length > 0,
        message: 'Cannot be empty'
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
    const {id, placeholder, className} = this.props;

    return (
      <div className={className}>
        <input id={id} ref="input" type="text" placeholder={placeholder} />
        {this.renderErrors()}
      </div>
    );
  }
}

Text.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string
};
