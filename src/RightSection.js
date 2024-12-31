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


    let renderContent;

    if (data.length > 0 && exerciseVid != "https://www.youtube.com/embed/None"){
        renderContent = (<iframe width="560" height="315" src={exerciseVid} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>);
    }
    else if (data.length > 0 && exerciseVid === "https://www.youtube.com/embed/None"){
        renderContent = (
            <div>
            <img src="https://preview.redd.it/959czh3iwjx41.png?auto=webp&s=c555e34cb7017fda681ce472f2ade1649b53b039" alt="placeholder" style = {{width: 560, height:315}}/>
            <p>Can't get video due to muscleandstrength.com video privacy policies (not a youtube video)</p>
            </div>
        )
    }
    else{
        renderContent = (<img src="https://healvets.org/wp-content/uploads/2021/10/ef3-placeholder-image.jpeg" alt="error image" style = {{width: 560, height:315}}/>)
    }
    
    
    return (
        <div className="right">
            {renderContent}
        </div>

    )

}

export default RightSection;
