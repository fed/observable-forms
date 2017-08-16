import React from 'react';
import {Form, Text, Email, Submit} from './forms';
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

      <Form action={handleSubmit}>
        <label htmlFor="emailAddress">Your name</label>
        <Text className="App__field" id="name" placeholder="Enter your full name" />

        <label htmlFor="emailAddress">Email Address</label>
        <Email className="App__field" id="emailAddress" placeholder="Enter your email address" />

        <label htmlFor="confirmEmailAddress">Confirm your Email Address</label>
        <Email className="App__field" id="confirmEmailAddress" placeholder="Please confirm your email address" />

        <Submit>Submit form</Submit>
      </Form>
    </section>
  );
}
