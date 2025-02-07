import "./Browse.css";
import axios from 'axios'
import { useState, useEffect } from 'react'
import Video from './Video'
import {useContext} from 'react';
import {WorkoutContext} from './WorkoutContext.js'

function Browse() {
    const [exerciseContainers] = useContext(WorkoutContext)
    const [exerciseSearch, setExerciseSearch] = useState('')

    const handleSearch = (newVal) => {
        setExerciseSearch(newVal);
    }

    return (
        <div>
            <h1>Exercise Browser</h1>
            <div className="searchBar">
                <input type="text" placeholder="Search" onChange={(e) => handleSearch(e.target.value)}></input>
            </div>

            <div className="searchResults">
                {
                    exerciseContainers.filter((item) => {
                        const search = exerciseSearch.toLowerCase();
                        const currExercise = item._id.toLowerCase();
                        return (currExercise.startsWith(search));
                    }).map((currExercise) => (
                        <div key={currExercise['_id']} className="childContainer">
                            <h3>{currExercise['_id']}</h3>
                            <Video vidId={currExercise.video} />
                            <span>Primary Muscle: {currExercise.primaryMuscle}</span>
                            <span>Secondary Muscles: {currExercise.secondaryMuscles}</span>
                            <span>Equipment: {currExercise.equipment}</span>
                            <span>Level: {currExercise.level}</span>
                            <span>Type: {currExercise.type}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Browse;