import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
       <div className="footer-content">
        <div className="footer-content-left">
             <img src={assets.logo} alt='image'/>
             <p>Craving something delicious? Explore our menu and order your favorite food with just a few clicks! Whether you're in the mood for pizza, sushi, or a hearty burger, 
                we've got something to satisfy every appetite. Fast delivery, fresh ingredients, and unbeatable flavors – order now and enjoy your meal in no time!</p>
                <div className='footer-social-icons'>
                    <img src={assets.facebook_icon} alt='imagees'/>
                    <img src={assets.twitter_icon} alt='imagees'/>
                    <img src={assets.linkedin_icon} alt='imagees'/>
                </div>
        </div>
        <div className="footer-content-center">
            <h2>Company</h2>
                <ul>
                    <li>HOME</li>
                    <li>ABOUT US</li>
                    <li>DELIVERY</li>
                    <li>PRIVACY POLICY</li>
                </ul>               
            </div>
            <div className="footer-content-right">
                <h2>Get in Touch</h2>
                <ul>
                    <li>+91 9998877665</li>
                    <li>contactin@tomato.com</li>
                </ul>
            
            </div>
       </div>
       <hr/>
       <p className='footer-copyright'> Copyright 2024 @ Rahul Verma</p>
    </div>
  )
}

export default Footer