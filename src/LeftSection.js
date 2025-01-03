import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './LeftSection.css'
import plusIcon from "./icons/plus.png"
import penIcon from "./icons/pen.png"
import minusIcon from "./icons/minus.png"
/*Add the icons in the edit div*/
function LeftSection({setData, setJSON, day}) {
    const [exercises, setExercise] = useState([{id: 1, name: "", sets: "", reps: ""}, {id: 2, name: "", sets: "", reps: ""}, {id: 3, name: "", sets: "", reps: ""}, {id: 4, name: "", sets: "", reps: ""}, {id: 5, name: "", sets: "", reps: ""}]);
    const [editMode, setEditMode] = useState(false);
    const [exercisesList, setExercisesList] = useState([]);
    const [currentDropdown, setCurrentDropdown] = useState(null);
    const [errors, setErrors] = useState({});

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

    useEffect(() => {
        const exerciseItem = {
            day: day,
            exercises: exercises.filter((exercise) => exercise.name && exercise.sets && exercise.reps)
        };
        setJSON(exerciseItem)

    }, [exercises])


    const handleExercise = (id, property, newValue) => {
        const updatedExercisesList = exercises.map((exercise) => exercise.id === id ? {...exercise, [property]:newValue} : exercise); //Dynamic key usage that handles input changes. 
        if ((property === "sets" || property === "reps") && (isNaN(newValue))){ //Checking if the input is non-numeric, if non-numeric don't update
            return;
        }
        else{
            setExercise(updatedExercisesList);
        }

        //Change the field that had errors to no errors
        if (newValue.trim() !== ""){
            setErrors((prev) => ({
                ...prev,
                [id]: {...prev[id], [property]: false} //Set that property to false to indicate no errors
            }));
        }
    }

    const handleClickExercise = (id, newValue) => {
        const updatedExercisesList = exercises.map((exercise) => exercise.id === id ? {...exercise, name:newValue} : exercise);
        setExercise(updatedExercisesList);
        setCurrentDropdown(null)
        setData(newValue);
        
    }

    const handleClick = () => {
        setExercise([...exercises, {id:Date.now(), name: "", sets: "", reps: ""}]);
        
    }

    const handleToggleMode = () => {
        setEditMode(!editMode);
    }

    const handleDelete = (id) => {
        const updatedExercisesList = exercises.filter((exercise) => exercise.id !== id)
        setExercise(updatedExercisesList);
    }

    function fetchJSON() {
        let itemJSON = 
        {
            day: day
            //exercises: 

        }
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
                                <input type="text" placeholder="Type exercise" className="exercises" onChange={(event) => handleExercise(exercise.id, "name", event.target.value)} value={exercise.name} onFocus = {() => setCurrentDropdown(exercise.id)}/>
                                <div className='dropDown'>
                                    {currentDropdown === exercise.id &&
                                        exercisesList.filter((item) => {
                                            const exerciseSearch = exercise.name.toLowerCase();
                                            const currExercise = item.toLowerCase();
                                            return (exerciseSearch && currExercise.startsWith(exerciseSearch) && exerciseSearch !== currExercise);

                                        }).map((mapExercise, id) => (
                                            <div key = {id} className="dropdown-row" onClick={() => {handleClickExercise(exercise.id, mapExercise)}}>{mapExercise}</div>))
                                    }
                                </div>
                                
                            </div>

                            <input type="text" placeholder="Sets" className="sets" value = {exercise.sets}onChange = {(event) => handleExercise(exercise.id, "sets", event.target.value)}/>
                            <input type="text" placeholder="Reps" className="reps" value = {exercise.reps} onChange = {(event) => handleExercise(exercise.id, "reps", event.target.value)}/>
                            
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