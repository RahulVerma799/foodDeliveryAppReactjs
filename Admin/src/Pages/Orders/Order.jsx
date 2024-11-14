import React from 'react'
import { toast } from 'react-toastify';
import {useState,useEffect} from 'react';
import axios from 'axios';
import { assets } from '../../assets/assets';
import './Order.css'


const Order = () => {

  const [order,setOrder]=useState([]);

  const fetchAllorder=async()=>{
    const response= await axios.get(`http://localhost:4000/api/order/list`);
      if(response.data.success){
        setOrder(response.data.data);
        console.log(response.data.data);
      }
      else{
        toast.error("Error")
      }
  }
  useEffect(()=>{
    fetchAllorder();
  },[])

  return (
    <div className='order add'>
      <h3> Order page</h3>
      <div className='order-list'>
        {order.map((order,index)=>(
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon}/>
              <div>
                <p className='order-item-food'>
                  {order.items.map((item,index)=>{
                    if(index===order.items.length-1){
                      return item.name + " x"+item.quantity
                    }
                    else{
                      return item.name + " x"+item.quantity + ","
                    }
                  })}
                </p>
                <p className='order-item-name'>{order.address.firstName+" "+order.address.lastName}</p>
                <div className='order-item-address'>
                  <p>{order.address.street+","}</p>
                  <p>{order.address.city+","+order.address.state+","}</p>
                </div>

                  <p className='order-item-phone'>{order.address.phone}</p>

              </div>
              <p>Items:{order.items.length+1}</p>
              <p>Rs{order.amount}</p>
              <select>
                <option value="Food Processing">Food Processing</option>
                <option value="out of delivery">out of delivery</option>
                <option value='delivered'>delivered </option>
              </select>
          </div>
      ))}
      </div>

    </div>
  )
}

export default Order