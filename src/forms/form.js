import React from 'react';
import PropTypes from 'prop-types';
import fromPairs from 'lodash/fromPairs';
import {isInputField} from '../utils/helpers';

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

  getChildren() {
    return React.Children.toArray(this.props.children);
  }

  getInputFields() {
    return this.getChildren().filter(isInputField);
  }

  isValid() {
    const invalidChildren = this.getInputFields()
      .map(component => component.props.id)
      .filter(ref => this.refs[ref].state.errors.length > 0);

    return invalidChildren.length === 0;
  }

  onSubmit() {
    if (this.isValid()) {
      const formValuesArray = this.getInputFields().map(field => [
        field.props.id,
        this.refs[field.props.id].state.value
      ]);
      const formValues = fromPairs(formValuesArray);

      this.props.onSubmit(formValues);
    } else {
      console.error('Form is not valid');
    }
  }

  render() {
    const children = this.getChildren().map(component => {
      if (isInputField(component)) {
        return React.cloneElement(component, { ref: component.props.id });
      } else {
        return component;
      }
    });

    return (
      <form method="POST">
        {children}
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
