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
    const [exercisesList, setExercisesList] = useState([]);
    const [currentDropdown, setCurrentDropdown] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/exercises")
            .then((response) => {
                const exerciseNames = response.data.map(exercise => exercise._id)
                setExercisesList(exerciseNames)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);


    const handleExercise = (id, newValue) => {
        const updatedExercisesList = exercises.map((exercise) => exercise.id === id ? {...exercise, value:newValue} : exercise);
        setExercise(updatedExercisesList);

    }

    const handleClickExercise = (id, newValue) => {
        const updatedExercisesList = exercises.map((exercise) => exercise.id === id ? {...exercise, value:newValue} : exercise);
        setExercise(updatedExercisesList);
        setCurrentDropdown(null)
        setData(newValue);
    }

    const handleClick = () => {
        setExercise([...exercises, {id:Date.now(), value: ""}]);
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
                                <input type="text" placeholder="Type exercise" className="exercises" onChange={(event) => handleExercise(exercise.id ,event.target.value)} value={exercise.value} onFocus = {() => setCurrentDropdown(exercise.id)}></input>
                                <div className='dropDown'>
                                    {currentDropdown === exercise.id &&
                                        exercisesList.filter((item) => {
                                            const exerciseSearch = exercise.value.toLowerCase();
                                            const currExercise = item.toLowerCase();
                                            return (exerciseSearch && currExercise.startsWith(exerciseSearch) && exerciseSearch != currExercise);

                                        }).map((mapExercise, id) => (
                                            <div key = {id} className="dropdown-row" onClick={() => {handleClickExercise(exercise.id, mapExercise)}}>{mapExercise}</div>))
                                    }
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