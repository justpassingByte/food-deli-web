import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Cart.css';
import { useSelector } from 'react-redux';

const Cart = ({url}) => {
  const [foodList, setList] = useState([]);
  const [cartData, setCartData] = useState({});
  const token = useSelector(state => state.auth.token);

  const fetchCartData = async () => {
    if (token) {
      try {
        const response = await axios.post(`${url}/api/cart/get`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success) {
          const cartData = response.data.data;
          console.log("Fetched Cart Data:", cartData);
          setCartData(cartData);
        } else {
          console.log("Failed to fetch cart data.");
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    } else {
      console.log("No token available.");
    }
  };

  const fetchList = async () => {
    try {
      const res = await axios.get(`${url}/api/food/listFood`);
      if (res.data.success) {
        console.log(res.data);
        setList(res.data.data);
      } else {
        toast.error("Error fetching the list");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCartData();
    fetchList();
  }, []);

  const removeFromCart = async (itemId) => {
    if (token) {
      try {
        await axios.post(`${url}/api/cart/remove`, { itemId }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Update the UI after removing the item
        fetchCartData();
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    } else {
      console.log("Token is Null");
    }
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
  
    Object.keys(cartData).forEach(itemId => {
      if (cartData[itemId] > 0) {
        const itemInfo = foodList.find((prod) => prod._id === itemId);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartData[itemId];
        }
      }
    });
  
    return totalAmount;
  };
  
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
                  <p onClick={() => removeFromCart(item._id)} className='cross'>X</p>        
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
          <p>{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
          <p>Delivery Fee</p>
          <p>{2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
          <b>Total</b>
          <b>{getTotalCartAmount()+ 2}</b>
          </div>
          <hr />
          <button>PROCEED CHECKOUT</button>
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
