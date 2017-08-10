import React from 'react';
import PropTypes from 'prop-types';
import fromPairs from 'lodash/fromPairs';
import {getFunctionName} from '../utils/helpers';
import * as inputTypes from './index';

export default class Form extends React.Component {
  constructor() {
    super();

    this.getInputFields = this.getInputFields.bind(this);
    this.isValid = this.isValid.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  getChildContext() {
    return {
      onSubmit: this.onSubmit
    };
  }

  getInputFields() {
    return React.Children
      .toArray(this.props.children)
      .filter(component => {
        const name = getFunctionName(component.type);
        const invalidFields = ['Form', 'Submit'];

        return Object(inputTypes).hasOwnProperty(name) && invalidFields.indexOf(name) === -1;
      });
  }

  getSubmitButton() {
    return React.Children
      .toArray(this.props.children)
      .filter(component => getFunctionName(component.type) === 'Submit');
  }

  isValid() {
    const invalidChildren = this.getInputFields()
      .map(component => component.props.id)
      .filter(ref => this.refs[ref].state.errors.length > 0);

    return invalidChildren.length === 0;
  }

  onSubmit() {
    if (this.isValid()) {
      const formValuesArray = this.getInputFields().map(textfield => [
        textfield.props.id,
        this.refs[textfield.props.id].state.value
      ]);
      const formValues = fromPairs(formValuesArray);

      this.props.onSubmit(formValues);
    } else {
      console.error('Form is not valid');
    }
  }

  render() {
    const inputFields = this.getInputFields()
      .map(component => React.cloneElement(component, { ref: component.props.id }));

    return (
      <form method="POST">
        {inputFields}
        {this.getSubmitButton()}
      </form>
    );
  }
}

Form.defaultProps = {
  children: []
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired
};

Form.childContextTypes = {
  onSubmit: PropTypes.func.isRequired
};
