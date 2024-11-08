import React from 'react';

const Sidebar = () => {
    return (
        <div className="w-64 h-full bg-gray-800 text-white flex flex-col">
            <h2 className="text-2xl font-bold p-4">Admin Menu</h2>
            <nav className="flex flex-col">
                <a href="/dashboard" className="p-4 hover:bg-gray-600">Dashboard</a>
                <a href="/orders" className="p-4 hover:bg-gray-600">Orders</a>
                <a href="/products" className="p-4 hover:bg-gray-600">Products</a>
                <a href="/customers" className="p-4 hover:bg-gray-600">Customers</a>
            </nav>
        </div>
    );
};

export default Sidebar;
