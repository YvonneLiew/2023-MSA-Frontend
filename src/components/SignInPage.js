import React, { useState } from 'react';
import { Form, Button, FormControl, InputGroup, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { SignIn } from '../services/authentication';

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  return (
    <Container style={{ maxWidth: '30rem', margin: 'auto', paddingTop: '8px' }}>
      <Form onSubmit={event => {
        event.preventDefault();
        SignIn(dispatch, { username, password });
      }}>
        <h4 style={{ textAlign: 'center' }}>Welcome Back</h4>
        <InputGroup className='mb-3'>
          <FormControl placeholder='Username'
            onChange={event => setUsername(event.target.value)} />
        </InputGroup>
        <InputGroup className='mb-3'>
          <FormControl placeholder='Password' type='password'
            onChange={event => setPassword(event.target.value)} />
        </InputGroup>
        <Button type='submit' variant='primary' style={{ margin: 'auto', display: 'block', width: '100%' }}>
          Sign In
        </Button>
      </Form>
    </Container>
  );
};

export default SignInPage;
