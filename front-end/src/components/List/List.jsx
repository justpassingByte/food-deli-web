import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './List.css'
const List = ({url }) => {
  console.log('List component is rendering');
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);


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
  const removeFood = async (foodId) =>{
    console.log(foodId);
    const res = await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList();
    if(res.data.success){
      toast.success(res.data.message);
    }else{
      toast.error("Error");
    }
  }
  useEffect(() => {
    fetchList();
  }, []); 

  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
          
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/` + item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className='cursor' onClick={()=> removeFood(item._id)}>X</p>
            </div>
          ))
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
};

export default List;
