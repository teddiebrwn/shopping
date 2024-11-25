import Home from "../Component/Home/Home";
import Login from "../Component/Auth/Login";
import Verify from "../Component/Auth/Verify";
import Register from "../Component/Auth/Register";
import RequestPasswordReset from "../Component/Auth/RequestPasswordReset";
import ResetPassword from "../Component/Auth/ResetPassword";

import ProductList from "../Component/Products/ProductList";
import CategoryList from "../Component/Categories/CategoryList";
import UserList from "../Component/User/UserList";
import OrderList from "../Component/Orders/OrderList";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/verify", element: <Verify /> },
  { path: "/register", element: <Register /> },
  { path: "/auth/request-password-reset", element: <RequestPasswordReset /> },
  { path: "/reset-password/:token", element: <ResetPassword /> },
  { path: "/products", element: <ProductList /> },
  { path: "/categories", element: <CategoryList /> },
  { path: "/users", element: <UserList /> },
  { path: "/orders", element: <OrderList /> },
];

export default routes;
