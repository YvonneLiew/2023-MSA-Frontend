import React, { useState } from 'react';
import { Form, Button, FormControl, InputGroup, Container } from 'react-bootstrap';
import { SignUp } from '../services/authentication';
import { useDispatch } from 'react-redux';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  return (
    <Container style={{ maxWidth: '30rem', margin: 'auto', paddingTop: '8px' }}>
      <Form onSubmit={event => {
        event.preventDefault();
        SignUp(dispatch, { username, password, email });
      }}>
        <h4 style={{ textAlign: 'center' }}>Welcome Back</h4>
        <InputGroup className='mb-3'>
          <FormControl placeholder='Username'
            onChange={event => setUsername(event.target.value)} />
        </InputGroup>
        <InputGroup className='mb-3'>
          <FormControl placeholder='Email'
            onChange={event => setEmail(event.target.value)} />
        </InputGroup>
        <InputGroup className='mb-3'>
          <FormControl placeholder='Password' type='password'
            onChange={event => setPassword(event.target.value)} />
        </InputGroup>
        <InputGroup className='mb-3'>
          <FormControl placeholder='Confirm Password' type='password'
            onChange={event => setConfirmPassword(event.target.value)} />
        </InputGroup>
        <Button type='submit' variant='success' style={{ margin: 'auto', display: 'block', width: '100%' }}
          disabled={password !== confirmPassword || password.length <= 0}>
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};

export default SignUpPage;
