// import React from 'react';
// import { Navigate, Route, Routes } from 'react-router-dom';
// import { getToken } from '../service/AuthService';

// const PublicRoute = ({ component: Component, ...rest }) => {
//   return (
//     <Routes>
//       <Route
//         {...rest}
//         render={(props) => {
//           return !getToken() ? (
//             <Component {...props} />
//           ) : (
//             <Navigate to={{ pathname: '/premium-content' }} />
//           );
//         }}
//       />
//     </Routes>
//   );
// };

// export default PublicRoute;

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const auth = null; // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? <Outlet /> : <Navigate to="/premium-content" />;
};

export default PublicRoute;
