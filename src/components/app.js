import React from 'react';
import Form from './forms/form.js';
import Email from './forms/email';
import './styles.css';

export default class App extends React.Component {
  handleClick(formData) {
    console.info('Form processing', formData);
  }

  render() {
    return (
      <section>
        <header>
          <h1>bacon-forms@0.0.0</h1>
        </header>

        <Form>
          <Email name="emailAddress" label="Email address" />
          <Email name="confirmEmailAddress" label="Confirm email address" />
          <button type="submit" onClick={this.handleClick.bind(this)}>Submit form</button>
        </Form>
      </section>
    );
  }
}
