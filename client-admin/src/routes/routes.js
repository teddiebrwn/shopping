import Home from '../Component/Home/Home';
import Login from '../Component/Auth/Login';
import Register from '../Component/Auth/Register';
import ProductList from '../Component/Products/ProductList';
import CategoryList from '../Component/Categories/CategoryList';
import UserList from '../Component/User/UserList';
import OrderList from '../Component/Orders/OrderList';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/products', element: <ProductList /> },
  { path: '/categories', element: <CategoryList /> },
  { path: '/users', element: <UserList /> },
  { path: '/orders', element: <OrderList /> },
];

export default routes;
