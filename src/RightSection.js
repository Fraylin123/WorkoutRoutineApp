import React from 'react'
import './RightSection.css'
//import example from './example.gif'


function RightSection({imgData}){
    return(
        <div className="right">
        <img src={imgData.image} alt='gif' />
        </div>
    )

}

export default RightSection;