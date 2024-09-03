import React, { useEffect, useState } from 'react';
import useCart from '../CustomHook/UseCart';
import { useDispatch, useSelector } from 'react-redux';
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.css';

const FoodDisplay = ({ category , url }) => {
  const dispatch = useDispatch();
  const { foodList, cartData, removeFromCart} = useCart(url);
  const token = useSelector(state => state.auth.token);
 
  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes</h2>
    
        <div className="food-display-list">
          {foodList.map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              cartData={cartData}
              removeFromCart={removeFromCart}
            />
          ))}
        </div>

    </div>
  );
};

export default FoodDisplay;
