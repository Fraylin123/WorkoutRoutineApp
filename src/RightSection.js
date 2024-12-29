import React from 'react'
import './RightSection.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
//import example from './example.gif'


function RightSection({data}){
    const [exerciseVid, setExerciseGif] = useState('')
    console.log(data)

    useEffect(() => {
        axios.get(`http://localhost:5000/exercises/${data}`).then(
            (response) => {
                console.log("Succesful request!")
                const vidID = response.data['video']
                setExerciseGif(`https://www.youtube.com/embed/${vidID}`)
            }
        ).catch((error) => {
            console.log("Error fetching this exercise:", error)
        })
    }, [data]);


    




    return(
        <div className="right">
            <iframe width="560" height="315" src={exerciseVid} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            <p>{exerciseVid}</p>
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