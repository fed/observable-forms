import React from 'react';
import TextField from './forms/textfield';
import './styles.css';

export default class App extends React.Component {
  render() {
    return (
      <section>
        <header>
          <h1>bacon-forms@0.0.0</h1>
        </header>

        <TextField name="email" label="Email address" type="email" />
      </section>
    );
  }
}
