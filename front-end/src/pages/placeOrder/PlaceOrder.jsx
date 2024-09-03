import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useCart from '../../components/CustomHook/UseCart';
import axios from 'axios';
import './PlaceOrder.css';

const PlaceOrder = ({ url }) => {
  const token = useSelector(state => state.auth.token);
  const { foodList, cartData, getTotalCartAmount } = useCart(url);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please log in to place an order.");
      return;
    }

    // Debugging: Check foodList and cartData before processing
    console.log('foodList:', foodList);
    console.log('cartData:', cartData);

    let orderItems = [];
    foodList.forEach((item) => {
      if (cartData[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartData[item._id] };
        orderItems.push(itemInfo);
      }
    });

    // Debugging: Check the contents of orderItems
    console.log('orderItems:', orderItems);

    if (orderItems.length === 0) {
      alert("Your cart is empty. Please add items to your cart before placing an order.");
      return;
    }

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    console.log(orderData);
    
    setLoading(true);

    try {
      let res = await axios.post(`${url}/api/order/place`, orderData, { headers: { Authorization: `Bearer ${token}` } });
      if (res.data.success) {
        const { session_url } = res.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing order. Please try again.");
      }
    } catch (error) {
      console.error("Order placement failed", error);
      alert("Order placement failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} value={data.firstName} name='firstName' type="text" placeholder='First name' />
          <input required onChange={onChangeHandler} value={data.lastName} name='lastName' type="text" placeholder='Last name' />
        </div>
        <input required onChange={onChangeHandler} value={data.email} name='email' type="email" placeholder='Email address' />
        <input required onChange={onChangeHandler} value={data.street} name='street' type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required onChange={onChangeHandler} value={data.city} name='city' type="text" placeholder='City' />
          <input required onChange={onChangeHandler} value={data.state} name='state' type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} value={data.zipcode} name='zipcode' type="text" placeholder='Zip code' />
          <input required onChange={onChangeHandler} value={data.country} name='country' type="text" placeholder='Country' />
        </div>
        <input required onChange={onChangeHandler} value={data.phone} name='phone' type="tel" placeholder='Phone number' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>{getTotalCartAmount(cartData, foodList)}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>{2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>{getTotalCartAmount(cartData, foodList) + 2}</b>
          </div>
          <hr />
          <button type='submit' disabled={loading}>
            {loading ? "Processing..." : "PROCEED TO PAYMENT"}
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder;
