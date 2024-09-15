import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // Default role
  const navigate = useNavigate();

  const handleSignUp = () => {
    // Retrieve existing users data from localStorage
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    // Create a new user object
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role
    };

    // Add the new user to the existing users array
    const updatedUsers = [...users, newUser];

    // Store the updated users array in localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Redirect to the login page after successful sign-up
    navigate('/login');
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}

export default SignUpPage;