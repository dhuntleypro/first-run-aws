import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import PremiumContent from './pages/PremiumContent';
import Register from './pages/Register';

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
            <Route exact path="/" element={<Home />} />
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/premium-content" element={<PremiumContent />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
