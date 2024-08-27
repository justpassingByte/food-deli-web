import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';
import './SideBar.css';

const SideBar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink 
          to='/add' 
          className="sidebar-option"
        >
            <img src={assets.add_icon} alt="Add Icon" />
            <p>Add Items</p>
        </NavLink>
        <NavLink 
          to='/list' 
          className="sidebar-option"
      
        >
            <img src={assets.order_icon} alt="List Icon" />
            <p>List Items</p>
        </NavLink>
        <NavLink 
          to='/order' 
          className="sidebar-option"
        
        >
            <img src={assets.order_icon} alt="Order Icon" />
            <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
}

export default SideBar;
