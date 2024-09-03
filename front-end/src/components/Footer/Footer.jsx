import React from 'react'
import {assets} from '../../assets/assets'
import './Footer.css'
const Footer = () => {
  return (
    <div className='footer' id='footer'> 
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni consectetur iste nulla perspiciatis, earum modi recusandae sed dolore alias. Fugit fugiat culpa asperiores hic quam odio esse nihil quisquam necessitatibus.</p>
            <div className="footer-social-icon">
                <img src={assets.facebook_icon} alt="" className="" />
                <img src={assets.twitter_icon} alt="" className="" />
                <img src={assets.linkedin_icon} alt="" className="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Private policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <li >+84 398028203</li>
            <li >contact@tomato.com</li>
        </div>
      </div>
      <hr />
      <p className="footer-copyright"> Copyright 2024 </p>
    </div>
  )
}

export default Footer
