import React from 'react';
import Form from './forms/form.js';
import TextField from './forms/textfield';
import './styles.css';

export default class App extends React.Component {
  render() {
    return (
      <section>
        <header>
          <h1>bacon-forms@0.0.0</h1>
        </header>

        <Form>
          <TextField name="emailAddress" label="Email address" type="email" />
          <TextField name="confirmEmailAddress" label="Confirm email address" type="email" />
          <button type="submit">Submit form</button>
        </Form>
      </section>
    );
  }
}
