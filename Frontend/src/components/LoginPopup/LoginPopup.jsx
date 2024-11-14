import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import axios from 'axios'; 
import { StoreContext } from '../../context/storeContext';

const LoginPopup = ({setShowLogin}) => {

  const {url,setToken}=useContext(StoreContext)

  

    const [currState,setCurrState]=useState('Sign up');
    const [data,setData]=useState({ name:"",email:"",password:""})

    const onChangeHandler=(e) =>{
      const name=e.target.name;
      const value=e.target.value;
      setData(data=>({...data,[name]:value}))
    }

    const onLogin=async(e)=>{
      e.preventDefault()

      let newUrl=url;
      if(currState==="Login"){
        newUrl+="/api/user/login"
      }
      else{
        newUrl+="/api/user/register"
      }

      const response = await axios.post(newUrl,data);
      if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token);
          setShowLogin(false)
      }
      else{
        alert(response.data.message)
      }
    }

    useEffect(()=>{
      console.log(data)
    },[data])

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin}  className="login-popup-container">
            <div className='login-popup-title'>
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />

            </div>
            <div className='login-popup-inputs'>
              {currState==="Login"?<></>: <input name='name' value={data.name} onChange={onChangeHandler} type='text' placeholder='your name' required/>}
              
                <input type='email' onChange={onChangeHandler} value={data.email}  name="email" placeholder='your email' required/>
                <input type='password' name="password" onChange={onChangeHandler} value={data.password} placeholder='your password' required/>

            </div>
           <button type='submit'> {currState==="Sign up"?"create account":"Login"}</button>
           <div className="login-popup-condition">
            <input type='checkbox' required/>
            <p> By continue i Agree it</p >
           </div>
           {currState==="Login"?
           <p>
            Create a new account?<span onClick={()=>setCurrState("Sign up")}>Click here</span>
           </p>:
           <p> Already have and account?<span onClick= {()=>setCurrState("Login")}>Login here</span></p>
           }
        </form>


    </div>
  )
}

export default LoginPopup