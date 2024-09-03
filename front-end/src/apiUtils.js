import axios from 'axios';
import { toast } from 'react-toastify';

const url = 'http://localhost:4000';

export const fetchList = async () => {
  try {
    const res = await axios.get(`${url}/api/food/listFood`);
    if (res.data.success) {
      return res.data.data;
    } else {
      toast.error("Error fetching the list");
      return [];
    }
  } catch (error) {
    if (error.response && error.response.status === 403) {
      // Token hết hạn hoặc không hợp lệ
      localStorage.removeItem('authToken');
      toast.error("Your session has expired. Please log in again.");
      // Điều hướng về trang đăng nhập
      window.location.href = '/login';
    } else {
      toast.error("Error fetching list food. Please try again.");
    }
    console.error("Error fetching list food:", error);
    return {};
  }
};

export const fetchCartData = async (token) => {
    if (!token) {
      console.log("No token available. Cannot fetch cart data.");
      return {};
    }
  
    try {
      const response = await axios.post(`${url}/api/cart/get`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const cartData = response.data.data
      if (response.data.success) {
        
        return response.data.data;
      } else {
        toast.error("Failed to fetch cart data.");
        return {};
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Token hết hạn hoặc không hợp lệ
        localStorage.removeItem('authToken');
        toast.error("Your session has expired. Please log in again.");
       
        window.location.href = '/login';
      } else {
        toast.error("Error fetching cart data. Please try again.");
      }
      console.error("Error fetching cart data:", error);
      return {};
    }
  };
  

export const removeFromCart = async (itemId, token) => {
  if (token) {
    try {
      await axios.post(`${url}/api/cart/remove`, { itemId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  } else {
    console.log("Token is Null");
  }
};

export const getTotalCartAmount = (cartData, foodList) => {
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
