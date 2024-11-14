import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import './List.css'

const List = () => {

    const [list,setList]=useState([]);

    const fetchList=async()=>{
      const response=await axios.get(`http://localhost:4000/api/food/get`);
      //console.log(response.data);
     
      if(response.data.success){
        setList(response.data.data)
      }
      else{
        toast.error("error")
      }
    }

    const removeFood =async(foodId)=>{
      const response= await axios.post(`http://localhost:4000/api/food/remove`,{id:foodId})
      await fetchList();
      console.log(foodId);
      if(response.data.success){
        toast.success(response.data.message)
      }
      else{
        toast.error("Error") 
      }
    }


    useEffect(()=>{
      fetchList();
    },[])

  return (
    <div className='List add flex-col'>
      <p>All Food List </p>
      <div className='list-table'>
        <div className='list-table-format title'>
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className='list-table-format'>
            <img src={`http://localhost:4000/images/`+item.image} alt=""/>
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List