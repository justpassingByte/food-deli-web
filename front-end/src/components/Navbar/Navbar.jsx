// src/components/Navbar/Navbar.jsx
import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);
  const userRole = useSelector(state => state.auth.userRole); // Access userRole from Redux store
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole'); // Remove userRole from local storage
    navigate('/');
  };

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <li onClick={() => { setMenu("home"); navigate('/'); }} className={menu === "home" ? "active" : ""}>home</li>
        <li onClick={() => { setMenu("menu"); navigate('/menu'); }} className={menu === "menu" ? "active" : ""}>menu</li>
        <li onClick={() => { setMenu("mobile"); navigate('/mobile-app'); }} className={menu === "mobile" ? "active" : ""}>mobile-app</li>
        <li onClick={() => { setMenu("contact"); navigate('/contact'); }} className={menu === "contact" ? "active" : ""}>contact us</li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
         <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link> 
          <div className="dot"></div>
        </div>
        {token ? (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li><img src={assets.bag_icon} alt="" /><p>Order</p></li>
              <hr />
              {userRole === 'admin' && (
                <li onClick={() => navigate('/admin-dashboard')}>
                  <img src="" alt="" /><p>Dashboard</p>
                </li>
              )}
              <hr />
              <li onClick={handleLogout}>
                <img src={assets.logout_icon} alt="" /><p>LogOut</p>
              </li>
            </ul>
          </div>
        ) : (
          <button onClick={() => navigate('/login')}>sign in</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
