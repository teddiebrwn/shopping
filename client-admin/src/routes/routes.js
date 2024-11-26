import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from '../Component/Home/Home';
import Login from "../Component/Auth/Login";
import Register from "../Component/Auth/Register";
import RequestPasswordReset from "../Component/Auth/RequestPasswordReset";
import ResetPassword from "../Component/Auth/ResetPassword";
import ProductList from '../Component/Products/ProductList';
import CategoryList from '../Component/Categories/CategoryList';
import UserList from '../Component/User/UserList';
import OrderList from '../Component/Orders/OrderList';
import Verify from "../Component/Auth/Verify";

const routes = [
  { path: '/', element: <Navigate to="/login" /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/verify', element: <Verify />},
  { path: '/resetpassword', element: <ResetPassword /> },
  { path: '/home', element: <Home />},
  { path: '/products', element: <ProductList /> },
  { path: '/categories', element: <CategoryList /> },
  { path: '/users', element: <UserList /> },
  { path: '/orders', element: <OrderList /> },
];

export default routes;
