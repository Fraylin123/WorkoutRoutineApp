import React, { useState } from 'react'
import './LeftSection.css'
import plusIcon from "./icons/plus.png"
import penIcon from "./icons/pen.png"
/*Add the icons in the edit div*/
function LeftSection(workoutType) {
    const [exercises, setExercise] = useState(["", "", "", "", ""]);

    const exerciseList = ['Bench Press', 'Dumbell Press', 'Cable Raises', 'Dumbell Lateral Raises', "Push ups"];
    const handleExercise = (value, index) => {
        const updatedExercisesList = [...exercises];
        updatedExercisesList[index] = value;
        setExercise(updatedExercisesList);

    }


    return (
        <div className='left'>
            <div className='editContainer'>

                <img src={plusIcon} alt="plus icon" />
                <img src={penIcon} alt="pen icon" />

            </div>

 
            <form>
                {exercises.map((exercise, index) => (
                    <div key={index}>
                        <label>{"Exercise " + (index + 1) + ":"}</label>
                        <div className="exerciseGroup">
                            <div className="autocomplete">
                                <input type="text" placeholder="Type exercise" className="exercises" onChange={(event) => handleExercise(event.target.value,index)} value={exercise}></input>
                                <div className='dropDown'>
                                    {exerciseList.filter((item) => {
                                        const exerciseSearch = exercise.toLowerCase();
                                        const currExercise = item.toLowerCase()
                                        return (exerciseSearch && currExercise.includes(exerciseSearch) && currExercise !== exerciseSearch)

                                    }).map((mapExercise) => (
                                        <div className="dropdown-row" onClick={() => {handleExercise(mapExercise,index)}}>{mapExercise}</div>))}
                                </div>
                            </div>

                            <input type="text" placeholder="Sets" className="sets"></input>
                            <input type="text" placeholder="Reps" className="reps"></input>

                        </div>
                    </div>

                ))}
                </form>

        </div>
    )
}

export default LeftSection;