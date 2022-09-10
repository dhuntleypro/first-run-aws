import {
  BrowserRouter,
  Navigate,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import PremiumContent from './pages/PremiumContent';
import Register from './pages/Register';
import PrivateRoute from './routes/PrivateRoute';
import { getToken } from './service/AuthService';

function App() {
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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
