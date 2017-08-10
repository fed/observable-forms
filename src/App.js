import React from 'react';
import {Form, Email, Submit} from './forms';
import './App.css';

function handleSubmit(formData) {
  console.info('Form processing logic', formData);
}

export default function App() {
  return (
    <section className="App">
      <header>
        <h1>observable-forms@0.0.0</h1>
      </header>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="emailAddress">Email Address</label>
        <Email id="emailAddress" placeholder="Enter your email address" />

        <label htmlFor="confirmEmailAddress">Email Address</label>
        <Email id="confirmEmailAddress" placeholder="Please confirm your email address" />

        <Submit>Submit form</Submit>
      </Form>
    </section>
  );
}
