import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import './Order.css';

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/list`);
      if (res.data.success) {
        setOrders(res.data.data);
      } else {
        toast.error('Error fetching orders');
      }
    } catch (error) {
      toast.error('Failed to fetch orders');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
  
    try {
      const res = await axios.post(`${url}/api/order/status`, { orderId, status: newStatus });
  
      if (res.data.success) {
        toast.success('Order status updated successfully');
        fetchAllOrders(); // Refetch orders to get updated status
      } else {
        toast.error(res.data.message || 'Failed to update order status');
      }
    } catch (error) {
      toast.error('Error updating order status');
    }
  };
  
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => (
                  <span key={index}>
                    {item.name} x {item.quantity}
                    {index !== order.items.length - 1 && ', '}
                  </span>
                ))}
              </p>
              <p className='order-item-name'>{order.address.firstName+""+order.address.lastName}</p>
              <div className='order-item-address'>
                <p>{order.address.street +", "}</p>
                <p>{order.address.city +", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              </div>
              <p>Items: {order.items.length}</p>
              <p>${order.amount}</p>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} >
                <option value="Food Processing" >Food Processing</option>
                <option value="Delivering" >Delivering</option>
                <option value="Delivered" >Delivered</option>
              </select>
              
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Order;
