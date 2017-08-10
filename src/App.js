import React from 'react';
import {Form, Email} from './forms';
import './App.css';

export default class App extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(formData) {
    console.info('Form processing logic', formData);
  }

  render() {
    return (
      <section className="App">
        <header>
          <h1>bacon-forms@0.0.0</h1>
        </header>

        <Form>
          <Email name="emailAddress" label="Email address" />
          <Email name="confirmEmailAddress" label="Confirm email address" />
          <button type="submit" onClick={this.handleClick}>Submit form</button>
        </Form>
      </section>
    );
  }
}
