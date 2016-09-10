import React from 'react';
import fromPairs from 'lodash/fromPairs';

export default class Form extends React.Component {
  isValid() {
    const refs = React.Children.map(this.props.children, (child) => child.props.name);
    const invalidChildren = refs.filter((elementRef) => this.refs[elementRef].state.errors.length > 0);
    const allFieldsAreValid = invalidChildren.length === 0;

    return allFieldsAreValid;
  }

  handleSubmit() {
    if (this.isValid()) {
      const children = React.Children.toArray(this.props.children);
      const button = children.filter((child) => child.type === 'button')[0];
      const formValues = children
        .filter((child) => child.type !== 'button')
        .map((textfield) => {
          return [
            textfield.props.name,
            this.refs[textfield.props.name].state.value
          ];
        });

      button.props.onClick(fromPairs(formValues));
    } else {
      console.log('Form is INVALID');
    }
  }

  render() {
    const children = React.Children.map(this.props.children, (child) => {
      const ref = child.props.name || Date.now();

      if (child.type === 'button') {
        return React.cloneElement(child, {ref, onClick: this.handleSubmit.bind(this)});
      } else {
        return React.cloneElement(child, {ref});
      }
    });

    return <div>{children}</div>;
  }
}

Form.defaultProps = {
  children: []
};

Form.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array
  ]).isRequired
};
