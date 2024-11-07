import React from 'react';
import Login from '../component/Login';

const LoginPage = () => {
    const handleLogin = (username, password) => {
        if (username === 'admin' && password === 'password') {
            window.location.href = '/admin';
        } else {
            alert('Invalid credentials');
        }
    };

    return <Login onLogin={handleLogin} />;
};

export default LoginPage;
