import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './LeftSection.css'
import plusIcon from "./icons/plus.png"
import penIcon from "./icons/pen.png"
import minusIcon from "./icons/minus.png"
/*Add the icons in the edit div*/
function LeftSection({ setData }) {
    const [exercises, setExercise] = useState([{id: 1, value: ""}, {id: 2, value: ""}, {id: 3, value: ""}, {id: 4, value: ""}, {id: 5, value: ""}]);
    const [editMode, setEditMode] = useState(false);
    const [exercisesList, setExercisesList] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/exercises")
            .then((response) => {
                setExercisesList(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const exerciseNames = exercisesList.map(exercise => exercise._id)

    const handleExercise = (id, newValue) => {
        const updatedExercisesList = exercises.map((exercise) => exercise.id === id ? {...exercise, value:newValue} : exercise);
        setExercise(updatedExercisesList);

        if (exerciseNames.includes(newValue)){
            console.log("Inside");
            setData(newValue);
        }
        
    }

    const handleClick = () => {
        setExercise([...exercises, {id:Date.now(), value:""}]);
    }

    const handleToggleMode = () => {
        setEditMode(!editMode);
    }

    const handleDelete = (id) => {
        const updatedExercisesList = exercises.filter((exercise) => exercise.id !== id)
        setExercise(updatedExercisesList);
    }


    return (
        <div className='left'>
            <div className='editContainer'>
                <button onClick={handleClick}><img src={plusIcon} alt="plus icon" /></button>
                <button onClick={handleToggleMode}><img src={penIcon} alt="pen icon" /></button>

            </div>

            <form>
                {exercises.map((exercise, index) => (
                    <div key={exercise.id}>
                        <label>{"Exercise " + (index + 1) + ":"}</label>
                        <div className="exerciseGroup">
                            <div className="autocomplete">
                                <input type="text" placeholder="Type exercise" className="exercises" onChange={(event) => handleExercise(exercise.id ,event.target.value)} value={exercise.value}></input>
                                <div className='dropDown'>
                                    {exerciseNames.filter((item) => {
                                        const exerciseSearch = exercise.value.toLowerCase();
                                        const currExercise = item.toLowerCase()
                                        return (exerciseSearch && currExercise.includes(exerciseSearch) && currExercise !== exerciseSearch)

                                    }).map((mapExercise, id) => (
                                        <div key = {id} className="dropdown-row" onClick={() => { handleExercise(exercise.id, mapExercise) }}>{mapExercise}</div>))}
                                </div>
                            </div>

                            <input type="text" placeholder="Sets" className="sets"></input>
                            <input type="text" placeholder="Reps" className="reps"></input>
                            {editMode && (
                                <button className="deleteExercise" onClick={() => handleDelete(exercise.id)}><img src={minusIcon} alt="minus icon" /></button>
                            )}

                        </div>
                    </div>

                ))}
            </form>

        </div>
    )
}

export default LeftSection;