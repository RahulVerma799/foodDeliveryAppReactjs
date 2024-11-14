import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/storeContext'
import axios from 'axios';
import { assets } from '../../assets/assets';
import './order.css';

const Myorders = () => {

    const {url,token}=useContext(StoreContext);
    const [data,setData]=useState([]);

    const fetchOrders=async()=>{
        const response=await axios.post(url +"/api/order/userOrder",{},{headers:{token}});
        setData(response.data.data);
        console.log(response.data.data);
    }

    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token])

  return (
    <div className='my-order'>
        <h2>My Order</h2>
        <div className='container'>
            {data.map((order,index)=>{
                return(
                    <div key={index} className='my-orderr-order'>
                        <img src={assets.parcel_icon} alt=''/>
                        <p>{order.items.map((item,index)=>{
                            if(index===order.items.length-1){
                                return item.name + "x" +item.quantity
                            }
                            else{
                                return item.name + "x" +item.quantity+","
                            }
                            
                        })}</p>

                            <p>Rs{order.amount}</p>
                            <p>Items:{order.items.length}</p>
                            <p><b>{order.status}</b></p>
                            <button>Track Order</button>

                    </div>
                )
            })}

        </div>
    </div>
  )
}

export default Myorders