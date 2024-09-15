import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthPage({ setIsLoggedIn }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuth = () => {
    if (isLogin) {
      // Login logic
      const storedUsers = localStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('userId', user.id);
        setIsLoggedIn(true);
        navigate('/');  // Redirect to home page after successful login
      } else {
        setError('Invalid email or password');
      }
    } else {
      // Signup logic
      const storedUsers = localStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        setError('Email already exists');
      } else {
        const newUser = {
          id: Date.now().toString(),
          name,
          email,
          password,
          role
        };
        const updatedUsers = [...users, newUser];
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setError('');
        setIsLogin(true);  // Switch to login view
        setName('');
        setEmail('');
        setPassword('');
        setRole('customer');
      }
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!isLogin && (
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      )}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {!isLogin && (
        <div>
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="customer">Customer</option>
            <option value="salesman">Salesman</option>
            <option value="storeManager">Store Manager</option>
          </select>
        </div>
      )}
      <button onClick={handleAuth}>{isLogin ? 'Login' : 'Sign Up'}</button>
      <p>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button onClick={() => {
          setIsLogin(!isLogin);
          setError('');
          setName('');
          setEmail('');
          setPassword('');
          setRole('customer');
        }}>
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
}

export default AuthPage;