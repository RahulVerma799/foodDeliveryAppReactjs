import React from 'react'
import { menu_list } from '../../assets/assets'
import './ExploreMenu.css'

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        <p className='Explore-menu-text'>
        Choose from diverse menu featuring a delectable array of dishes Our mission is satistfy your cravying
        </p>

        <div className='explore-menu-list'>
            {menu_list.map((items,index)=>{
                return (
                    <div onClick={()=>setCategory(prev=>prev===items.menu_name?"All":items.menu_name)} key={index} className='explore-menu-list-item'>
                        <img className={category===items.menu_name?"active":""} src={items.menu_image} alt='images'/>
                        <p>{items.menu_name}</p>
                    </div>
                )
            })}
        </div>
            <hr/>
    </div>
  )
}

export default ExploreMenu