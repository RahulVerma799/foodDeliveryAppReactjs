import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/storeContext'
import "./Placeholder.css"
import axios from 'axios'
import { useNavigate } from 'react-router'
 

const Placeholder = () => {

  const { food_list,url,token,cartItem,setCartItem,addtoCart,removeCart,  getTotalCartAmount}=useContext(StoreContext)
  
  const [data,setData]=useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onChangeHandler=(e)=>{
   

    const name=e.target.name;
    const value=e.target.value;

    setData(data=>({...data,[name]:value}))
  }

  const placeOrder =async(e)=>{
    e.preventDefault();

    let orderItems=[];
    food_list.map((item)=>{
        if(cartItem[item._id]>0){
          let itemInfo=item;
          itemInfo['quantity']=cartItem[item._id];
          orderItems.push(itemInfo)

        }
    })
    console.log(orderItems);
    let orderData={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }
  let response=await axios.post(url +"/api/order/Place",orderData,{headers:{token}})
    if(response.data.success){
     // const {session_url}=response.data;
     // window.location.replace(session_url);
     alert("order Successfully")
    }
    else{
      alert("error in order")
    }
  }

  const navigate=useNavigate();

  useEffect(()=>{
      if(!token){
        navigate('/cart')
      }
      else if(getTotalCartAmount()===0){
        navigate('/cart')
      }
      
  },[token])
  
  return (
    <form className='place-order'>
  <div className='place-order-left'>
    <p className='title'>Delivery Information</p>
    <div className='multi-fields'>
      <input name='lastName' onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Second Name' />
      <input name='firstName' onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First Name' />
    </div>
    <input type='text' name="email" onChange={onChangeHandler} value={data.email} placeholder='email address' />
    <input type='text' name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' />
    <div className='multi-fields'>
      <input type='text' name="city" onChange={onChangeHandler} value={data.city} placeholder='City' />
      <input type='text' name='state' onChange={onChangeHandler} value={data.state} placeholder='State' />
    </div>

    <div className='multi-fields'>
      <input type='text' name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' />
      <input type='text' name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' />
    </div>

    <input type='number' name='phone' onChange={onChangeHandler} value={data.phone} placeholder='phone' />
  </div>


      <div className='place-order-right'>

      <div className="cart-total">
          <h2>Cart Total</h2>
        <div>
            <div className="cart-total-details">
            <p>SubTotal</p>
            <p>Rs{getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>{getTotalCartAmount()===0?0:2}</p>

            </div>
            <div className="cart-total-details">
                <b>Total</b>
                <b>Rs{ getTotalCartAmount()===0?0: getTotalCartAmount()+2}</b>

            </div>
        </div>
        <button onClick={placeOrder} >PROCEED TO CHECKOUT</button>
      </div>

      </div>
      

    </form>
  )
}

export default Placeholder