// import React from 'react';
// import { Navigate, Route } from 'react-router-dom';
// import { getToken } from '../service/AuthService';

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         return getToken() ? (
//           <Component {...props} />
//         ) : (
//           <Navigate to={{ pathname: '/login' }} />
//         );
//       }}
//     />
//   );
// };

// export default PrivateRoute;

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const auth = null; // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
