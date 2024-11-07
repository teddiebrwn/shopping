import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded">
                <h2 className="text-2xl mb-4">Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mb-2 p-2 border border-gray-300 rounded w-full"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-2 p-2 border border-gray-300 rounded w-full"
                />
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
            </form>
        </div>
    );
};

export default Login;
