import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    navigate('/logout');
  };

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/admin">Admin</Link></li>
          <li><Link to="/salesman">Salesman</Link></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;