import React, { useState, useEffect } from 'react';
import useCart from '../../components/CustomHook/UseCart';
import './Cart.css';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

const Cart = ({ url }) => {
  const { foodList, cartData, removeFromCart, getTotalCartAmount } = useCart(url);
  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate();
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {foodList.map(item => {
          if (cartData[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={`${url}/images/${item.image}`} alt={item.name} /> 
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartData[item._id]}</p>
                  <p>${item.price * cartData[item._id]}</p>       
                  <p onClick={() => removeFromCart(item._id, token)} className='cross'>X</p>        
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>{getTotalCartAmount(cartData, foodList)}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>{getTotalCartAmount() === 0?0:2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>{getTotalCartAmount() === 0?0:getTotalCartAmount(cartData, foodList) + 2}</b>
          </div>
          <hr />
        
          <button onClick={()=> navigate('/placeorder')}>PROCEED CHECKOUT</button>
        
        </div>
        <div className="cart-promo-code">
          <div>
            <p>If you had a promo code enter it here</p>
            <div className="cart-promo-code-input">
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
