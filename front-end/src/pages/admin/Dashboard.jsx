
import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../../components/Sidebar/SideBar';
import './Dashboard.css'; 

const Dashboard = () => {
  return (
    <div className="admin-dashboard">
      <SideBar />
      <Outlet /> 
    </div>
  );
}

export default Dashboard;
