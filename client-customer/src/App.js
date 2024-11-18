import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './components/Homepage/Homepage';
import MenPage from './components/MenPage/MenPage';
import WomenPage from './components/WomenPage/WomenPage';
import OutwearPage from './components/OutwearPage/OutwearPage';
import AccessoriesPage from './components/AccessoriesPage/AccessoriesPage';
import AllProductsPage from './components/AllProductsPage/AllProductsPage';
import CartPage from './components/Cart/Cart';
import SearchPage from './components/Search/Search';
import LoginPage from './components/Login/Login';
import RegisterPage from './components/Register/Register';
import ProductDetail from './components/ProductDetail/ProductDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/men" element={<MenPage />} />
            <Route path="/products/women" element={<WomenPage />} />
            <Route path="/products/outwear" element={<OutwearPage />} />
            <Route path="/products/accessories" element={<AccessoriesPage />} />
            <Route path="/products/all" element={<AllProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
