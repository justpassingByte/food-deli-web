import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import './FoodItem.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const FoodItem = ({ id, name, price, description, image, cartData, removeFromCart }) => {
  const token = useSelector(state => state.auth.token);
  const [itemCount, setItemCount] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    // Initialize itemCount with data from cartData prop
    if (cartData && cartData[id]) {
      setItemCount(cartData[id]);
    }
   
  }, [cartData, id]);

  const addToCart = async () => {
    setItemCount(prev => prev + 1);
    if (token) {
     const response = await axios.post("http://localhost:4000/api/cart/add", { itemId: id }, { headers: { Authorization: `Bearer ${token}` } });
      console.log("Food Add");
      console.log("Token:", token);
    } else {
      console.log("Token is Null");
    }
  };
  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img src={`http://localhost:4000/images/${image}`} alt="" className="food-item-image" />
        {itemCount === 0 ? (
          <img onClick={addToCart} src={assets.add_icon_white} alt="" className="add" />
        ) : (
          <div className="food-item-counter">
            <img onClick={() => removeFromCart(id,token)} src={assets.remove_icon_red} alt="" />
            <p>{itemCount}</p>
            <img onClick={addToCart} src={assets.add_icon_green} alt="" />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
