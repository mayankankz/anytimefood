import React from 'react';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import Routes from '../../routes/Routers.js';
import Carts from '../UI/cart/Carts.jsx';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Layout = () => {
  const showCart = useSelector((state) => state.cartUI.cartIsVisable);
  return (
    <div>
      <Header />

      {showCart && <Carts />}
      <div>
        <Routes />
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Layout;
