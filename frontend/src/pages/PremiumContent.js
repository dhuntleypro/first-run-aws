import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, resetUserSession } from '../service/AuthService';

const PremiumContent = () => {
  const navigate = useNavigate();

  const user = getUser();
  const name = user !== 'undefined' && user ? user.name : '';

  const logoutHandler = () => {
    resetUserSession();
    navigate('/login');
  };
  return (
    <>
      {user ? (
        <div>
          Hello {name}! You have been logged in !!! Welcome to the premium
          content.
          <input type="button" value="Logout" onClick={logoutHandler}></input>
        </div>
      ) : (
        <div>not signed in</div>
      )}
    </>
  );
};

export default PremiumContent;
