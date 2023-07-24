import {React, useState, useEffect} from 'react';
import {Row, Col, Form, Button} from 'react-bootstrap';
import {DeleteExpense, NewExpense, EditExpense} from '../services/expenses';
import {useDispatch} from 'react-redux';

export default ({expense, setIsEditing}) => {
    const descriptions = ['Groceries', 'Credit Card', 'Student Loans', 'Eating Out', 'Gas']
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState(descriptions[0]);
    const [isNewExpense, setIsNewExpense] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if(expense !== undefined) {
            setIsNewExpense(false);
            setAmount(expense.amount);
        }
        else {
            setIsNewExpense(true);
        }
    }, [expense]);

    return <Form
        onSubmit={event => {
            event.preventDefault();
            if (isNewExpense) {
                //create new expense
                NewExpense(dispatch, {description: description, amount: Number(amount)});
            }
            else {
                // edit exp
                EditExpense(dispatch, {id: expense.id, description: description, amount: Number(amount)});
                setIsEditing(false);
            }
        }}
    >
        <Row>
            <Col className='col-6'>
                <Form.Label>Description</Form.Label>
                <Form.Control as='select'
                    onChange={event => setDescription(event.target.value)}>
                    {descriptions.map(d => <option>{d}</option>)}
                </Form.Control>
            </Col>
            <Col className='col-5'>
                <Form.Label>Amount</Form.Label>
                <Form.Control type='number' step='0.01' placeholder={amount} onChange={event => setAmount(event.target.value)}/>
            </Col>
            <Col className='col-1 d-flex justify-content-end align-items-end'>
                {isNewExpense 
                ? (
                    <Button variant='primary' type='submit'>Add</Button>
                ) : (
                <div className='d-flex'>
                    <Button variant='danger' style={{marginRight: '2px'}} onClick={() => DeleteExpense(dispatch, expense)}>Delete</Button>
                    <Button variant='success' style={{marginRight: '2px'}} type='submit'>Save</Button>
                    <Button variant='default' style={{marginRight: '2px'}} onClick={() => setIsEditing(false)}>Cancel</Button>
                </div>
                )}
            </Col>
        </Row>
        <Row>
            <p> </p>
        </Row>
    </Form>
}