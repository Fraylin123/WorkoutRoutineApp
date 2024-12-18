import React from 'react'
import './RightSection.css'
//import example from './example.gif'


function RightSection({data}){
    let source = "https://fitnessprogramer.com/wp-content/uploads/2021/02/Push-Up.gif"
    if (data && data.length > 0 && data === "Dumbell Press"){
        source= 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Press.gif'
    }

    return(
        <div className="right">
            <img src={source} alt='gif' />
            <p>{data}</p>
        </div>
    )

}

export default RightSection;
/*

Format of storing the data in the MongoDB databse
{
    'exercise1': {
        type:
        equipment:
        primaryMuscles: []
        secondary: []

    }
    'exercise2': {
        type:
        equipment:
        primaryMuscles: []
        secondary: []

    }
        









}
    */