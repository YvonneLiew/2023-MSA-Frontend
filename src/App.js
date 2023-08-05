import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import StatisticsPage from './components/StatisticsPage';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HomePage from './components/HomePage';
import { userAuthenticated } from './app/authenticationSlice';
import { React, useEffect } from 'react';
import Navbar from './components/Navbar';

const App = () => {
  const { isLoggedIn } = useSelector(state => state.authenticationSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if(token !== undefined && token !== null) {
      dispatch(userAuthenticated({token: token}))
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={isLoggedIn ? <HomePage /> : <SignInPage />} />
        <Route path='/signup' element={isLoggedIn ? <Navigate to='/' /> : <SignUpPage />} />
        <Route path='/signin' element={isLoggedIn ? <Navigate to='/' /> : <SignInPage />} />
        <Route path='/statistics' element={isLoggedIn ? <StatisticsPage /> : <Navigate to='/signin' />} />
        <Route path='*' element={<h2>Page not found!</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
