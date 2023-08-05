// Navbar.js

import { useDispatch, useSelector } from "react-redux";
import { Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { logout } from '../app/authenticationSlice';
import './styles.css';

const Navbar = () => {
  const { isLoggedIn } = useSelector(state => state.authenticationSlice);
  const dispatch = useDispatch();

  // Function to check if the screen size is smaller than 576px (phones)
  const isMobileScreen = () => window.innerWidth < 576;

  return (
    <Nav className='navbar' style={{ backgroundColor: '#e4fff2' }}>
      <h1 style={{ fontFamily: 'Lobster', margin: '0', paddingLeft: '20px', fontSize: '30px', flex: 1 }}>My Expenses</h1>
      <div className={`${isMobileScreen() ? "center-items" : "right-align"}`} style={{ paddingRight: '20px', paddingTop: '10px', paddingBottom: '10px' }}>
        {
          isLoggedIn
          ? <>
            <Button variant='primary' href='/'>Home</Button>
            <Button variant='primary' as={NavLink} to='/statistics' style={{ marginLeft: '10px' }}>Statistics</Button>
            <Button variant='primary' href='/signin' onClick={() => dispatch(logout())} style={{ marginLeft: '10px' }}>Log out</Button>
          </>
          : <>
            <Button variant='outline-primary' as={NavLink} to='/signup'>Sign up</Button>
            <Button variant='primary' as={NavLink} to='/signin' style={{ marginLeft: '10px' }}>Sign in</Button>
          </>
        }
      </div>
    </Nav>
  );
}

export default Navbar;
