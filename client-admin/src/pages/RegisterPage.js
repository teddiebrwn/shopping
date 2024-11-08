import React from 'react';
import { useNavigate } from 'react-router-dom';
import Register from '../component/Register';

const RegisterPage = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <Register onGoToLogin={goToLogin} />
    </div>
  );
};

export default RegisterPage;
