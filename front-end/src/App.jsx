import React from 'react';
import Navbar from './components/Navbar/Navbar';
import SideBar from './components/Sidebar/SideBar';
import { Route, Routes } from 'react-router-dom';
import Add from './components/Add/Add';
import List from './components/List/List';
import Order from './components/Order/Order';
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='app'>
      <ToastContainer/>
      <Navbar />
      <hr />
      <div className='app-content'>
        <SideBar />
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
