import React, { useEffect, useState } from 'react'
import './Add.css';
import { assets } from '../../assets/assets';
import axios from "axios";
import { toast } from 'react-toastify';


const Add = () => {

    const [image,setImage]=useState(false);
    const [data,setData]=useState({
        name:'',
        description:"",
        price:"",
        category:"",
    })

    const onChangeHandle=(event)=>{
        const name=event.target.name;
        const value=event.target.value;

        setData(data=>({...data,[name]:value}))
    }

   const onSubmitHandler=async(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("price",Number(data.price))
    formData.append("category",data.category)
    formData.append("image",image)
    const response = await axios.post(`http://localhost:4000/api/food/add`, formData);

        if(response.data.success){
            setData({
                name:"",
                description:"",
                price:"",
                category:"Salad",
            })
            setImage(false)
            toast.success(response.data.message)
            
        }
        else{
                toast.error(response.data.message)
        }
    
   }

  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
            <div className='add-img-upload flex-col'>
                    <p>Image Upload</p>
                    <label htmlFor='image'>
                        <img className='imageSize' src={ image ? URL.createObjectURL(image):assets.add_icon_green} alt="" />    
                    </label>
                    <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required/>
            </div>
            <div className='add-product-name flex-col'>
                <p>Product Name</p>
                <input onChange={onChangeHandle} value={data.name} type='text' name='name' placeholder='type here'/>

            </div>
            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea onChange={onChangeHandle} value={data.description} name='description' rows="4" placeholder='write a content' required />
            </div>

            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select onChange={onChangeHandle} value={data.category} name='category'>
                        <option value='Salad'>Salad</option>
                        <option value='Rolls'>Rolls</option>
                        <option value='Deserts'>Deserts</option>
                        <option value='Sandwich'>Sandwich</option>
                        <option value='Cake'>Cake</option>
                        <option value='Pure Veg'>Pure Veg</option>
                        <option value='Pasta'>Pasta</option>
                        <option value='Noodles'>Noodles</option>
                    </select>

                </div>
                <div className='add-price flex-col'>
                    <p>Product Price</p>
                    <input onChange={onChangeHandle} value={data.price} type='Number' name='price' placeholder='Rs-20'/>
                </div>
            </div>
            <button type='submit' className='add-btn'>Add</button>
        </form>
    </div>
  )
}

export default Add