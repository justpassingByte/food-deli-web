import React from 'react';
import Navbar from './components/Navbar/Navbar';
import SideBar from './components/Sidebar/SideBar';
import { Route, Routes } from 'react-router-dom';
import Add from './components/Add/Add';
import List from './components/List/List';
import Order from './components/Order/Order';
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import PlaceOrder from './pages/placeOrder/PlaceOrder';
import UserAuthForm from './components/UserAuthForm/UserAuthForm';
const App = () => {
  const url = "http://localhost:4000";
  return (
    <div className='app'>
      <ToastContainer/>
      <Navbar />
      <hr />
      <div className='app-content'>
        {/* <SideBar /> */}
        <Routes>
          <Route path="/" element={<Home url ={url } />} />
          <Route path="/login" element={<UserAuthForm type ={"Sign-In"} url ={url } />} />
          <Route path="/register" element={<UserAuthForm type ={"Sign-Up"} url ={url } />} />
          <Route path="/add" element={<Add url ={url } />} />
          <Route path="/list" element={<List url ={url }/>} />
          <Route path="/order" element={<Order url ={url }/>} />
          <Route path="/cart" element={<Cart url ={url } />} />
          <Route path="/placeorder" element={<PlaceOrder url ={url } />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
