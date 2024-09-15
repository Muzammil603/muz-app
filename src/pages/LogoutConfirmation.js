import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutConfirmation() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/auth');
  };

  return (
    <div>
      <h2>Successfully Logged Out</h2>
      <p>Thank you for using SmartHomes.</p>
      <button onClick={handleContinue}>Continue</button>
    </div>
  );
}

export default LogoutConfirmation;