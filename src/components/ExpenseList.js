import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetExpenses } from '../services/expenses';
import { Button, Row, Col } from 'react-bootstrap';
import ExpenseForm from './ExpenseForm';
import './styles.css';

const ExpenseList = () => {
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expensesSlice.expenses);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    GetExpenses(dispatch);
  }, [dispatch]);

  const filteredExpenses = expenses.filter(
    expense => expense.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the total expense amount
  const totalExpenseAmount = filteredExpenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
          placeholder="Search expenses"
        />
      </div>

      {filteredExpenses.map(expense => (
        <div key={expense.id} style={{ marginBottom: '1rem' }}>
          <ListRow expense={expense} />
        </div>
      ))}

      <div className="total-expense" style={{paddingBottom: '20px'}}>
        <strong>Total Expenses:</strong> ${totalExpenseAmount.toFixed(2)}
      </div>
    </div>
  );
};

const ListRow = ({ expense }) => {
  const [isEditing, setIsEditing] = useState(false);

  return isEditing ? (
    <ExpenseForm expense={expense} setIsEditing={setIsEditing} />
  ) : (
    <div>
      <Row>
        <Col xs={12} sm={6}>
          {expense.description}
        </Col>
        <Col xs={12} sm={3} className="mt-2 mt-sm-0">
          ${expense.amount}
        </Col>
        <Col xs={12} sm={3} className="mt-2 mt-sm-0 d-flex justify-content-end">
          <Button variant="warning" onClick={() => setIsEditing(!isEditing)}>
            Edit
          </Button>
        </Col>
      </Row>
      <hr />
    </div>
  );
};

export default ExpenseList;
