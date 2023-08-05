import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { DeleteExpense, NewExpense, EditExpense } from '../services/expenses';
import { useDispatch } from 'react-redux';

const ExpenseForm = ({ expense, setIsEditing }) => {
  const descriptions = ['Groceries', 'Credit Card', 'Student Loans', 'Eating Out', 'Gas', 'Other'];
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState(descriptions[0]);
  const [customDescription, setCustomDescription] = useState(''); // New state for custom description
  const [isNewExpense, setIsNewExpense] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (expense !== undefined) {
      setIsNewExpense(false);
      setAmount(expense.amount);
      setDescription(expense.description);
    } else {
      setIsNewExpense(true);
    }
  }, [expense]);

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        if (isNewExpense) {
          // Create new expense
          NewExpense(dispatch, { description: description === 'Other' ? customDescription : description, amount: Number(amount) });
        } else {
          // Edit existing expense
          EditExpense(dispatch, { id: expense.id, description: description === 'Other' ? customDescription : description, amount: Number(amount) });
          setIsEditing(false);
        }
      }}
    >
      <Row className="mb-3 align-items-end">
        <Col xs={12} md={6}>
          <Form.Label>Description</Form.Label>
          <Form.Control as="select" value={description} onChange={(event) => setDescription(event.target.value)}>
            {descriptions.map(d => <option key={d}>{d}</option>)}
          </Form.Control>
          {description === 'Other' && (
            <Form.Control
              type="text"
              placeholder="Enter custom description"
              value={customDescription}
              onChange={(event) => setCustomDescription(event.target.value)}
            />
          )}
        </Col>
        <Col xs={12} md={5} className="mt-3 mt-md-0">
          <Form.Label>Amount</Form.Label>
          <Form.Control type="number" step="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} />
        </Col>
        <Col xs={12} md={1} className="mt-3 mt-md-0 d-flex justify-content-end">
          {isNewExpense ? (
            <Button variant="primary" type="submit" style={{ marginLeft: 'auto' }}>Add</Button>
          ) : (
            <div className="d-flex justify-content-center">
              <Button variant="danger" style={{ marginRight: '2px' }} onClick={() => DeleteExpense(dispatch, expense)}>Delete</Button>
              <Button variant="success" style={{ marginRight: '2px' }} type="submit">Save</Button>
              <Button variant="default" style={{ marginRight: '2px' }} onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          )}
        </Col>
      </Row>
    </Form>
  );
};

export default ExpenseForm;
