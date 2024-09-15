import React, { useState } from 'react';

function CustomerRegistration({ onLogin, onSignUp }) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
  });

  const handleLoginInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUpInputChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLogin(loginData);
    setLoginData({
      email: '',
      password: '',
    });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    onSignUp(signUpData);
    setSignUpData({
      name: '',
      email: '',
      password: '',
      address: '',
    });
  };

  return (
    <div>
      <h2>Customer Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label htmlFor="loginEmail">Email:</label>
          <input
            type="email"
            id="loginEmail"
            name="email"
            value={loginData.email}
            onChange={handleLoginInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="loginPassword">Password:</label>
          <input
            type="password"
            id="loginPassword"
            name="password"
            value={loginData.password}
            onChange={handleLoginInputChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <h2>Customer Sign Up</h2>
      <form onSubmit={handleSignUpSubmit}>
        <div>
          <label htmlFor="signUpName">Name:</label>
          <input
            type="text"
            id="signUpName"
            name="name"
            value={signUpData.name}
            onChange={handleSignUpInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="signUpEmail">Email:</label>
          <input
            type="email"
            id="signUpEmail"
            name="email"
            value={signUpData.email}
            onChange={handleSignUpInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="signUpPassword">Password:</label>
          <input
            type="password"
            id="signUpPassword"
            name="password"
            value={signUpData.password}
            onChange={handleSignUpInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="signUpAddress">Address:</label>
          <textarea
            id="signUpAddress"
            name="address"
            value={signUpData.address}
            onChange={handleSignUpInputChange}
            required
          ></textarea>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default CustomerRegistration;