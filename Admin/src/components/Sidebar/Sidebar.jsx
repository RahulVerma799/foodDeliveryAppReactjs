import React from 'react'
import { assets } from '../../assets/assets'
import './Sidebar.css'
import Navbar from '../Navbar/Navbar'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-options'>
            <NavLink to='/add' className='sidebar-option'>
              <img src={assets.add_icon_white} alt="" />
              <p>Add Items</p>
            </NavLink>

            <NavLink to='/list' className='sidebar-option'>
              <img src={assets.bag_icon} alt="" />
              <p>Lists</p>
            </NavLink>

            <NavLink to='/Order' className='sidebar-option'>
              <img src={assets.add_icon_white} alt="" />
              <p>Orders</p>
            </NavLink>


        </div>
      </div>
    
  )
}

export default Sidebar