import React from 'react';
import "./AppDownload.css"
import { assets } from '../../assets/assets';

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>

            <p> for better experiece download <br/> Tomato App</p>
            <div className='app-download-platform'>
                <img src={assets.play_store} alt='image'/>
                <img src={assets.app_store} alt='image'/>
            </div>

    </div>
  )
}

export default AppDownload