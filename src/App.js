import React from 'react';
import {Form, Email} from './forms';
import './App.css';

function handleClick(formData) {
  console.info('Form processing logic', formData);
}

export default function App() {
  return (
    <section className="App">
      <header>
        <h1>observable-forms@0.0.0</h1>
      </header>

      <Form>
        <Email name="emailAddress" label="Email address" />
        <Email name="confirmEmailAddress" label="Confirm email address" />
        <button type="submit" onClick={handleClick}>Submit form</button>
      </Form>
    </section>
  );
}
