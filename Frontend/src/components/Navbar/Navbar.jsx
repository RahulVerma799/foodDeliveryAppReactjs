import React, { useContext, useState } from 'react'
import {assets} from "../../assets/assets"
import {Link, Navigate, useNavigate} from 'react-router-dom'
import './Navbar.css'
import { StoreContext } from '../../context/storeContext'




const Navbar = ({setShowLogin}) => {
  const [menu,setMenu]=useState("menu");
  const {getTotalCartAmount,token,setToken}=useContext(StoreContext);

  const navigate=useNavigate();

  const logout =()=>{
    localStorage.removeItem("token");
    setToken("");
    Navigate("/")
  }

  return (
    <div className='navbar'>
        <Link to={'/'}><img src={assets.logo} alt='imagefile' className='logo'/></Link>
        <ul className='navbar-menu'>
            <Link to={'/'} className={menu==="home"?"active":""}  onClick={() => setMenu("home")}>home</Link>
            <a href='#explore-menu' className={menu==="menu"?"active":""}  onClick={() => setMenu("menu")}>menu</a>
            <a href='#app-download' className={menu==="mobile-app"?"active":""}  onClick={() => setMenu("mobile-app")}>mobile-app</a>
            <a href='#footer' className={menu==="contact-us"?"active":""}  onClick={() => setMenu("contact-us")}>contact us</a>
        </ul>
        <div className='navbar-right'>
            <img src={assets.search_icon} alt=''/>
            <div className='navbar-search-icon'>
              <Link to={'/cart'}>  <img src={assets.basket_icon} alt=''/></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
            {
              !token ?  <button onClick={()=>{setShowLogin(true)}}>Sign in</button>:
              <div className='navbar-profile'><img src={assets.profile_icon} alt='profile'/>
              <ul className='nav-profile-dropdown'>
                <li onClick={()=>navigate('/Orders')}><img src={assets.bag_icon} alt=''/><p>Orders</p></li>
                <hr/>
                <li onClick={logout}><img src={assets.logout_icon}/><p>Logout</p></li>
                </ul> </div>
            }
            
        </div>

    </div>
  )
}

export default Navbar