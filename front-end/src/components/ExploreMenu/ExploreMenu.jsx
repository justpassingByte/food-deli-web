import React from 'react';
import { menu_list } from '../../assets/assets'; // Assuming this is an array of objects
import './ExploreMenu.css'
const ExploreMenu = (category,setCategory) => {
  console.log('Explore menu component is rendering');
  
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore Our Menu</h1>
      <p className='explore-menu-text'>Choose from a diverse menu</p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div onClick = {()=>setCategory(prev => prev === item.menu_name? "All":item.menu_name)}className='explore-menu-list-item' key={index}>
            <img className={category=== item.menu_name?"active":""} src={item.menu_image} alt={item.menu_name} />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}

export default ExploreMenu;
