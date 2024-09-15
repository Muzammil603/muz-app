import React from 'react';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';

function LoginSignupPage() {
  return (
    <div>
      <h1>Welcome to SmartHomes</h1>
      <LoginPage />
      <SignUpPage />
    </div>
  );
}

export default LoginSignupPage;