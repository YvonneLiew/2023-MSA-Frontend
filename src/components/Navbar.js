import { useDispatch, useSelector } from "react-redux";
import { Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { logout } from '../app/authenticationSlice';

const Navbar = () => {
    const { isLoggedIn } = useSelector(state => state.authenticationSlice);
    const dispatch = useDispatch();

    return (
        <Nav className='navbar' style={{ backgroundColor: '#e4fff2' }}>
            <h1 style={{ fontFamily: 'Lobster', margin: '0', paddingLeft: '20px', fontSize: '30px' }}>My Expenses</h1>
            {
                isLoggedIn
                ? <div style={{ display: 'flex', paddingRight: '20px', paddingTop: '10px', paddingBottom: '10px' }}>
                    <Button variant='primary' href='/signin' onClick={() => dispatch(logout())}>Log out</Button>
                  </div>
                : <div style={{ display: 'flex', paddingRight: '20px', paddingTop: '10px', paddingBottom: '10px' }}>
                    <Button variant='outline-primary' as={NavLink} to='/signup'>Sign up</Button>
                    <Button variant='primary' as={NavLink} to='/signin' style={{ marginLeft: '10px' }}>Sign in</Button>
                  </div>
            }
        </Nav>
    );
}

export default Navbar;