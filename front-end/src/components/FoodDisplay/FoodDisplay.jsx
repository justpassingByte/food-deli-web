import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FoodItem from '../FoodItem/FoodItem';
import { toast } from 'react-toastify'; 
import './FoodDisplay.css';
import { useSelector } from 'react-redux';

const FoodDisplay = ({ category }) => {
  console.log("Food displayed");

  const [foodList, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartData, setCartData] = useState({});
  const url = 'http://localhost:4000';
  const token = useSelector(state => state.auth.token);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
    fetchCartData();
  }, []);

  // Fetch initial cart data when component mounts
  const fetchCartData = async () => {
    if (token) {
      try {
        const response = await axios.post(`${url}/api/cart/get`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success) {
          const cartData = response.data.data;
          console.log("Fetched Cart Data:", cartData);
          // Initialize itemCount with fetched cart data
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

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes</h2>
      {loading ? (
        <p>Loading...</p> 
      ) : (
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
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
