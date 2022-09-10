import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import PremiumContent from './pages/PremiumContent';
import Register from './pages/Register';
// import PrivateRoute from './routes/PrivateRoute';
import {
  getToken,
  getUser,
  resetUserSession,
  setUserSession,
} from './service/AuthService';

const verifyTokenAPIURL =
  'https://srut07d9ka.execute-api.us-east-1.amazonaws.com/prod/verify';

function App() {
  const [isAuthenicating, setAuthenicating] = useState(true);
  useEffect(() => {
    const token = getToken();
    if (
      token === 'undefined' ||
      token === undefined ||
      token === null ||
      !token
    ) {
      return;
    }

    const requestConfig = {
      headers: {
        // you can find in aws, under api gateway | api keys | show
        'x-api-key': 'ygzOzmOjbpaOJNWiwVR582KMw0WdGe1E9HnV8dEZ',
      },
    };

    const requestBody = {
      user: getUser(),
      token: token,
    };

    axios
      .post(verifyTokenAPIURL, requestBody, requestConfig)
      .then((response) => {
        setUserSession(response.data.user, response.data.token);
        setAuthenicating(false);
      })
      .catch(() => {
        resetUserSession();
        setAuthenicating(false);
      });
  }, []);

  const token = getToken();
  if (isAuthenicating && token) {
    return <div className="content">Authenicating...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className="header">
          <NavLink to="/"> Home</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/premium-content">Premium Content</NavLink>
        </div>

        <div className="content">
          <Routes>
            {/* Public Routes */}
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />

            {/* Private Routes (not coded optimally - refresh fuction on login)*/}
            <Route exact path="/premium-content" element={<PremiumContent />} />

            {/* <PrivateRoute>
              <Route
                exact
                path="/premium-content"
                element={<PremiumContent />}
              />
            </PrivateRoute> */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
