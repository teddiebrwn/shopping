import React from 'react';

const Header = ({ onLogout }) => {
    return (
        <header className="bg-white shadow p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center">
                <button onClick={onLogout} className="text-gray-600 hover:text-black">Logout</button>
            </div>
        </header>
    );
};

export default Header;
