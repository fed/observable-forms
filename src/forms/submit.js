import React from 'react';
import PropTypes from 'prop-types';

export default function Submit({ children }, { onSubmit }) {
  function onClick(event) {
    event.preventDefault();

    onSubmit();
  }

  return (
    <button type="submit" onClick={onClick}>
      {children}
    </button>
  );
}

Submit.propTypes = {
  children: PropTypes.string.isRequired
};

Submit.contextTypes = {
  onSubmit: PropTypes.func.isRequired
};
