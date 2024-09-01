import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import './Add.css';

import axios from "axios";
import { toast } from 'react-toastify';

const Add = ({url }) => {
  console.log('Add component is rendering');
  
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  });

  const onChangeHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const res = await axios.post(`${url}/api/food/add`, formData);

      if (res.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad"
        });
        setImage(null);
        console.log("Add success");
        toast.success(res.data.message);
      } else {
        console.log("Add fail");
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className='add'>
      <form className="flex-col" onSubmit={submitHandler}>
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input 
            onChange={(e) => setImage(e.target.files[0])} 
            type="file" 
            id="image" 
            hidden 
            required 
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input 
            onChange={onChangeHandle} 
            value={data.name} 
            type="text" 
            name="name" 
            placeholder='Type here' 
            required 
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea 
            onChange={onChangeHandle} 
            value={data.description} 
            name="description" 
            rows="6" 
            placeholder='Write content here' 
            required 
          />
        </div>
        <div className="add-category-price flex-col">
          <p>Product category</p>
          <select 
            onChange={onChangeHandle} 
            name="category" 
            value={data.category}
            required
          >
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Deserts">Deserts</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure veg">Pure veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
          </select>
        </div>
        <div className="add-price flex-col">
          <p>Product price</p>
          <input 
            onChange={onChangeHandle} 
            value={data.price} 
            type="number" 
            name='price' 
            placeholder='20$' 
            required 
          />
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  );
};

export default Add;
