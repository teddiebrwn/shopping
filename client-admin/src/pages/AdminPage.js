import React, { useState } from 'react';
import Sidebar from '../component/Sidebar';
import Header from '../component/Header';

const AdminPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const handleLogout = () => {
        setIsLoggedIn(false);
        window.location.href = '/login'; // điều hướng về trang đăng nhập
    };

    if (!isLoggedIn) return null;

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Header onLogout={handleLogout} />
                <main className="p-8">
                    <h2 className="text-2xl">Welcome to Admin Dashboard</h2>
                    {/* Các nội dung quản lý của Admin */}
                </main>
            </div>
        </div>
    );
};

export default AdminPage;
    