import React from 'react'
import './RightSection.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
//import example from './example.gif'


function RightSection({ data }) {
    const [exerciseVid, setExerciseVid] = useState('')
    console.log(data)

    useEffect(() => {
        if (data.length > 0) {
            axios.get(`http://localhost:5000/exercises/${data}`).then(
                (response) => {
                    console.log("Succesful request!")
                    const vidID = response.data['video']
                    setExerciseVid(`https://www.youtube.com/embed/${vidID}`)
                }
            ).catch((error) => {
                console.log("Error fetching this exercise:", error)
            })
        }
    }, [data]);

   

    return (
        <div className="right">
        {(data.length > 0 && exerciseVid != "https://www.youtube.com/embed/None") ? (
            <iframe width="560" height="315" src={exerciseVid} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        )
        :
        (<img src="https://healvets.org/wp-content/uploads/2021/10/ef3-placeholder-image.jpeg" alt="placeholder" style = {{width: 560, height:315}}/>)
        }

     

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