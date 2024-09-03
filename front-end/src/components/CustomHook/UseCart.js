import { useState, useEffect, useCallback } from 'react';
import { fetchList, fetchCartData, removeFromCart, getTotalCartAmount } from '../../apiUtils';
import { useSelector } from 'react-redux';

const useCart = (url) => {
  const [foodList, setList] = useState([]);
  const [cartData, setCartData] = useState({});
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedList = await fetchList();
      setList(fetchedList);

      const fetchedCartData = await fetchCartData(token);
      setCartData(fetchedCartData);
    };

    fetchData();
  }, [token, url]);

  const removeItem = useCallback(
    async (itemId) => {
      await removeFromCart(itemId, token);
      const updatedCartData = await fetchCartData(token);
      setCartData(updatedCartData);
    },
    [token]
  );

  const calculateTotal = useCallback(
    () => getTotalCartAmount(cartData, foodList),
    [cartData, foodList]
  );

  return {
    foodList,
    cartData,
    removeFromCart: removeItem,
    getTotalCartAmount: calculateTotal
  };
};

export default useCart;
