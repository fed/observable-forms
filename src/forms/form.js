import React from 'react';
import PropTypes from 'prop-types';
import fromPairs from 'lodash/fromPairs';

export default class Form extends React.Component {
  getChildren() {
    return React.Children.toArray(this.props.children);
  }

  getInputFields() {
    return this.getChildren()
      .filter((component) => component.type !== 'button');
  }

  getSubmitButton() {
    return this.getChildren()
      .filter((component) => component.type === 'button')[0];
  }

  isValid() {
    const invalidChildren = this.getInputFields()
      .map((component) => component.props.name)
      .filter((ref) => this.refs[ref].state.errors.length > 0);

    return invalidChildren.length === 0;
  }

  handleSubmit() {
    if (this.isValid()) {
      const formValuesArray = this.getInputFields()
        .map((textfield) => [
          textfield.props.name,
          this.refs[textfield.props.name].state.value
        ]);
      const formValues = fromPairs(formValuesArray);

      this.getSubmitButton().props.onClick(formValues);
    } else {
      console.error('Form is not valid');
    }
  }

  render() {
    const inputFields = this.getInputFields()
      .map((component) => React.cloneElement(component, {ref: component.props.name}));
    const submitButton = React.cloneElement(this.getSubmitButton(), {onClick: this.handleSubmit.bind(this)});
    const children = inputFields.concat([submitButton]);

    return <div>{children}</div>;
  }
}

Form.defaultProps = {
  children: []
};

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired
};
