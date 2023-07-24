import ExpenseList from './ExpenseList';
import ExpenseForm from './ExpenseForm';
import { ToastContainer } from 'react-toastify';

const HomePage = () => (
    <div style={{width: '60%', margin: 'auto'}}>
        <ToastContainer />
        <h3 style={{paddingTop: '10px'}}>New Expense</h3>
        <ExpenseForm />
        <h3 style={{border: '1px solid grey'}} />
        <h3>Your Expenses</h3>
        <ExpenseList />
    </div>
);

export default HomePage;