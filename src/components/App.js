import React, { useEffect, useState } from 'react';
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
      <button onClick={handleLogin}>{isLoggedIn ? 'Log Out' : 'Log In'}</button>
    </div>
  );
};

const Fallback = () => {
  return (
    <div>
      <p>Page Not Found.</p>
    </div>
  );
};

const ProtectedRoute = ({ isLoggedIn, children }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);
  
  return isLoggedIn ? children : null;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogin() {
    setIsLoggedIn(!isLoggedIn);
  }

  return (
    <BrowserRouter>
      <p>
        {isLoggedIn
          ? 'Logged in, Now you can enter Playground'
          : "You are not authenticated, Please login first"}
      </p>
      <nav>
        <ul>
          <li>
          <NavLink to={isLoggedIn ? "/": "/login"}>PlayGround</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <PlayGround />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} handleLogin={handleLogin} />} />
        <Route path="*" element={<Fallback />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
