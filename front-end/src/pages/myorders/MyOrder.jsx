import React, { useEffect, useState } from 'react';
import './MyOrder.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {assets} from '../../assets/assets'
const MyOrder = ({ url }) => {
  const [data, setData] = useState([]);
  const token = useSelector(state => state.auth.token);

  const fetchOrders = async () => {
    try {
      const res = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData(res.data.data || []);
      console.log(res.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className='my-orders'>
      <div className="container">
        {data && data.length > 0 ? (
          data.map((order, index) => {
            return (
              <div className="my-orders-order" key={index}>
                <img src={assets.parcel_icon} alt="" />
                <p>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
                </p>
                <p>${order.amount}.00</p>
                <p>Items: {order.items.length}</p>
                <p>
                  <span>&#x25cf;</span> <b>{order.status}</b>
                </p>
                <button>Track Order</button>
              </div>
            );
          })
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );  
};

export default MyOrder;
