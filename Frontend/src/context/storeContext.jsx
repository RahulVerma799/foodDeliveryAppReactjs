import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from 'axios';

export const StoreContext=createContext(null)


const StoreContextProvider=(props)=> {

    const [cartItem,setCartItem]=useState({})
    const url="http://localhost:4000"
    const [token,setToken]=useState("")
    const [food_list,setFoodList]=useState([])

    const addtoCart=async(itemId)=>{
        if(!cartItem[itemId]){
            setCartItem((prev)=>({...prev,[itemId]:1}))
        } else{
            setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url +"/api/cart/add",{itemId},{headers:{token}});
        }
    }

    const removeCart=async(itemId)=>{
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))

        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

   const getTotalCartAmount=()=>{
    let totalAmount=0;
    for(const item in cartItem){
        if(cartItem[item]>0){
            let itemInfo=food_list.find((product)=>product._id===item);
            totalAmount=totalAmount+itemInfo.price * cartItem[item];

        }
       
    }
    return totalAmount;
   }

   const fetchFoodlist=async()=>{
    const response=await axios.get(url+"/api/food/get")
    setFoodList(response.data.data);
   }

   const localCartData=async(token)=>{
        const response= await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItem(response.data.cartData)
   }

   useEffect(()=>{
  

    async function loadData(){
        await fetchFoodlist(); 
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            await localCartData(localStorage.getItem("token"));
        }
    }
    loadData();
   },[])

    const contextValue={
        food_list,
        cartItem,setCartItem,addtoCart,removeCart,
            getTotalCartAmount,url,token,setToken
    }
    return(
        <StoreContext.Provider value={contextValue}>
                {props.children}
            </StoreContext.Provider>
    )
}

export default StoreContextProvider; 