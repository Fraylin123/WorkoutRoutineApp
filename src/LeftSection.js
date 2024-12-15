import React, { useState } from 'react'
import './LeftSection.css'
import plusIcon from "./icons/plus.png"
import penIcon from "./icons/pen.png"
import minusIcon from "./icons/minus.png"
/*Add the icons in the edit div*/
function LeftSection({ setData }) {
    const [exercises, setExercise] = useState([{id: 1, value: ""}, {id: 2, value: ""}, {id: 3, value: ""}, {id: 4, value: ""}, {id: 5, value: ""}]);
    const [editMode, setEditMode] = useState(false);

    const exerciseList = ['Bench Press', 'Dumbell Press', 'Cable Raises', 'Dumbell Lateral Raises', 'Push ups'];

    const handleExercise = (id, newValue) => {
        const updatedExercisesList = exercises.map((exercise) => exercise.id === id ? {...exercise, value:newValue} : exercise);
        setExercise(updatedExercisesList);
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
                                    {exerciseList.filter((item) => {
                                        const exerciseSearch = exercise.value.toLowerCase();
                                        const currExercise = item.toLowerCase()
                                        return (exerciseSearch && currExercise.includes(exerciseSearch) && currExercise !== exerciseSearch)

                                    }).map((mapExercise) => (
                                        <div className="dropdown-row" onClick={() => { handleExercise(exercise.id, mapExercise) }}>{mapExercise}</div>))}
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