import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, NavLink, useNavigate } from 'react-router-dom';

const PlayGround = () => {
  return (
    <div>
      <p>Hi, welcome to the code PlayGround.</p>
    </div>
  );
};

const Login = ({ isLoggedIn, handleLogin }) => {
  return (
    <div>
      <p>Login</p>
      <button onClick={() => { handleLogin() }}>{isLoggedIn ? 'Log Out' : 'Log In'}</button>
    </div>
  );
};

const Fallback = () => {
  return (
    <div>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

const PrivateRoute = ({ isLoggedIn, children }) => {
  const navigate = useNavigate();
  if (!isLoggedIn) {
    navigate('/login');
  }
  return children
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className='main-container'>
      <BrowserRouter>
        <p>
          {isLoggedIn
            ? 'Logged in, Now you can enter Playground'
            : "You are not authenticated, Please login first"}
        </p>
        <nav>
          <ul>
            <li>
              <NavLink to={isLoggedIn ? "/" : "login"}>PlayGround</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/"
            element={<PrivateRoute isLoggedIn={isLoggedIn}>
              <PlayGround />
            </PrivateRoute>} />
          <Route path="/login" element={<Login isLoggedIn={isLoggedIn} handleLogin={handleLogin} />} />
          <Route path="*" element={<Fallback />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;