import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from './components/Navbar/Navbar';
import Add from './components/Add/Add';
import List from './components/List/List';
import Order from './components/Order/Order';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import PlaceOrder from './pages/placeOrder/PlaceOrder';
import UserAuthForm from './components/UserAuthForm/UserAuthForm';
import Footer from './components/Footer/Footer';
import Dashboard from './pages/admin/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/verify/Verify';
import MyOrder from './pages/myorders/MyOrder';

const App = () => {
  const url = "http://localhost:4000";
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <div>
      <div className='app'>
        <ToastContainer />
        <Navbar />
        <hr />
        <div className='app-content'>
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/login" 
              element={isAuthenticated ? <Navigate to="/" /> : <UserAuthForm type="Sign-In" url={url} />} 
            />
            <Route 
              path="/register" 
              element={isAuthenticated ? <Navigate to="/" /> : <UserAuthForm type="Sign-Up" url={url} />} 
            />
            
            {/* Protected Routes */}
            <Route 
              path="/" 
              element={<Home url={url} />}
            />
            <Route
              path="/cart"
              element={isAuthenticated ? <Cart url={url} /> : <Navigate to="/login" />}
            />
        
            <Route
              path="/placeorder"
              element={isAuthenticated ? <PlaceOrder url={url} /> : <Navigate to="/login" />}
            />
            <Route
              path="/verify"
              element={isAuthenticated ? <Verify url={url} /> : <Navigate to="/login" />}
            />
            <Route
              path="/myorders"
              element={isAuthenticated ? <MyOrder url={url} /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin-dashboard/*"
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
            >
              {/* Admin Routes */}
              <Route path="add" element={<Add url={url} />} />
              <Route path="list" element={<List url={url} />} />
              <Route path="order" element={<Order url={url} />} />
            </Route>

            {/* Redirect any undefined routes */}
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
