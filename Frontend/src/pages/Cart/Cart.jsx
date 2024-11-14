import React, { useContext } from 'react'
import { StoreContext } from '../../context/storeContext'
import './Cart.css'
import { useNavigate } from 'react-router'

const Cart = () => {

  const { food_list,cartItem,setCartItem,addtoCart,removeCart,url,  getTotalCartAmount}=useContext(StoreContext)

  const navigate=useNavigate();

  return (

    <div className='cart'>
      <div className="cart-items">
        <div className="cart-item-title ">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br/>
        <hr/>
        {food_list.map((items,index)=>{
          if(cartItem[items._id]>0){
            return(
              <div>
              <div key={index} className='cart-item-title cart-items-item'>
                <img src={url+"/images/"+items.image} alt=''/>
                <p>{items.name}</p>
                <p>{items.price}</p>
                <p>{cartItem[items._id]}</p>
                <p>{items.price*cartItem[items._id]}</p>
                <p onClick={()=>removeCart(items._id)} className='cross'>X</p>
              </div>
              <hr/>
              </div>
              
            )
          }
        })}
      </div>
      <div className='cart-button'>
        <div className="cart-total">
          <h2>Cart Total</h2>
        <div>
            <div className="cart-total-details">
            <p>SubTotal</p>
            <p>Rs{getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>Rs{getTotalCartAmount()===0?0:2}</p>

            </div>
            <div className="cart-total-details">
                <b>Total</b>
                <b>Rs{ getTotalCartAmount()===0?0: getTotalCartAmount()+2}</b>

            </div>
        </div>
        <button onClick={()=>navigate('/Order')} >PROCEED TO CHECKOUT</button>
        </div>
        <div className='cart-promocode'>
          <p>Enter the code </p>
          <div className="cart-promocode-input">
            <input type='text' placeholder='promo code'/>
            <button>Submit</button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Cart