import React, { useState } from 'react';
import axios from 'axios'; // call api
import { setUserSession } from '../service/AuthService';
import { useNavigate } from 'react-router-dom';

// you can find in aws, under api gateway | stages | url
const loginUrl =
  'https://srut07d9ka.execute-api.us-east-1.amazonaws.com/prod/login';
// const { history } = this.props;

const Login = () => {
  const navigate = useNavigate();

  //   const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();

    if (username.trim() === '' || password.trim() === '') {
      setErrorMessage('Both username and password are required');
      return;
    }
    setErrorMessage(null);

    // store api key in envirnment variable
    const requestConfig = {
      headers: {
        // you can find in aws, under api gateway | api keys | show
        'x-api-key': 'ygzOzmOjbpaOJNWiwVR582KMw0WdGe1E9HnV8dEZ',
      },
    };

    const requestBody = {
      username: username,
      password: password,
    };

    axios
      .post(loginUrl, requestBody, requestConfig)
      .then((response) => {
        setUserSession(response.data.user, response.data.token);
        setErrorMessage('Login Successful');
        navigate('/premium-content');
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage(
            'sorry...the backend server is down!! Please try again later'
          );
        }
      });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h5>Login</h5>
        username{' '}
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />{' '}
        <br />
        password{' '}
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />{' '}
        <br />
        <input type="submit" value="Login" />
      </form>
      {errorMessage && <p className="message">{errorMessage}</p>}
    </div>
  );
};

export default Login;
