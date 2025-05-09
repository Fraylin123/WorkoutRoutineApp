import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/LeftSection.css';
import plusIcon from '../assets/images/icons/plus.png';
import penIcon from '../assets/images/icons/pen.png';
import minusIcon from '../assets/images/icons/minus.png';
import { WorkoutContext } from '../context/WorkoutContext';
import { useContext } from 'react';

//Component for the left part of the Home section (inner Home.js component)
function LeftSection({ setExerciseData, setJSON, day, errors, setErrors, setButtonClicked }) {
    const API_URL =  process.env.REACT_APP_API_URL;
    const { exercisesList, setExercisesList, currentDropdown, setCurrentDropdown, exerciseJSON } =
        useContext(WorkoutContext);

    const [editMode, setEditMode] = useState(false);
    const [exercises, setExercise] = useState(
        exerciseJSON.find((item) => item.day === day.name)?.exercises || [
            { id: 1, name: '', sets: '', reps: '' },
            { id: 2, name: '', sets: '', reps: '' },
            { id: 3, name: '', sets: '', reps: '' },
            { id: 4, name: '', sets: '', reps: '' },
            { id: 5, name: '', sets: '', reps: '' },
        ]
    );

    useEffect(() => {
        axios
            .get(`${API_URL}/api/exercises`, { withCredentials: true })
            .then((response) => {
                const exerciseNames = response.data.map((exercise) => exercise._id);
                setExercisesList(exerciseNames);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        const exerciseItem = {
            day: day.name,
            exercises: exercises,
        };
        setJSON(exerciseItem);
    }, [exercises, day.id]);

    const handleExercise = (id, property, newValue) => {
        const updatedExercisesList = exercises.map((exercise) =>
            exercise.id === id ? { ...exercise, [property]: newValue } : exercise
        ); //Dynamic key usage that handles input changes.
        if ((property === 'sets' || property === 'reps') && isNaN(newValue)) {
            //Checking if the input is non-numeric, if non-numeric don't update
            return;
        } else {
            setExercise(updatedExercisesList);
        }

        if (newValue.trim() !== '') {
            setErrors(errors.map((item) => (item.id === id ? { ...item, [property]: false } : item)));
        }
        setButtonClicked(false);
        setEditMode(false);
    };

    const handleClickExercise = (id, newValue) => {
        const updatedExercisesList = exercises.map((exercise) =>
            exercise.id === id ? { ...exercise, name: newValue } : exercise
        );
        setExercise(updatedExercisesList);
        setCurrentDropdown(null);
        setExerciseData(newValue);
    };

    const handleClick = () => {
        setExercise([...exercises, { id: Date.now(), name: '', sets: '', reps: '' }]);
        setButtonClicked(false);
        console.log(errors);
    };

    const handleToggleMode = () => {
        setEditMode(!editMode);
        console.log(errors);
    };

    const handleDelete = (id) => {
        const updatedExercisesList = exercises.filter((exercise) => exercise.id !== id);
        setExercise(updatedExercisesList);
        setErrors(errors.filter((exercise) => exercise.id !== id));
        setButtonClicked(false);
    };

    return (
        <div className="left">
            <div className="editContainer">
                <button onClick={handleClick}>
                    <img src={plusIcon} alt="plus icon" />
                </button>
                <button onClick={handleToggleMode}>
                    <img src={penIcon} alt="pen icon" />
                </button>
            </div>

            <form>
                {exercises.map((exercise, index) => (
                    <div key={exercise.id}>
                        <label>{'Exercise ' + (index + 1) + ':'}</label>
                        <div className="exerciseGroup">
                            <div className="autocomplete">
                                <input
                                    type="text"
                                    placeholder="Type exercise"
                                    className={`exercises ${errors[index]?.name ? 'error' : ''}`}
                                    onChange={(event) => handleExercise(exercise.id, 'name', event.target.value)}
                                    value={exercise.name}
                                    onFocus={() => setCurrentDropdown(exercise.id)}
                                />
                                <div className="dropDown">
                                    {currentDropdown === exercise.id &&
                                        exercisesList
                                            .filter((item) => {
                                                const exerciseSearch = exercise.name.toLowerCase();
                                                const currExercise = item.toLowerCase();
                                                return (
                                                    exerciseSearch &&
                                                    currExercise.startsWith(exerciseSearch) &&
                                                    exerciseSearch !== currExercise
                                                );
                                            })
                                            .map((mapExercise, id) => (
                                                <div
                                                    key={id}
                                                    className="dropdown-row"
                                                    onClick={() => {
                                                        handleClickExercise(exercise.id, mapExercise);
                                                    }}
                                                >
                                                    {mapExercise}
                                                </div>
                                            ))}
                                </div>
                            </div>

                            <input
                                type="text"
                                placeholder="Sets"
                                className={`sets ${errors[index]?.sets ? 'error' : ''}`}
                                value={exercise.sets}
                                onChange={(event) => handleExercise(exercise.id, 'sets', event.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Reps"
                                className={`reps ${errors[index]?.reps ? 'error' : ''}`}
                                value={exercise.reps}
                                onChange={(event) => handleExercise(exercise.id, 'reps', event.target.value)}
                            />

                            {editMode && (
                                <button className="deleteExercise" onClick={() => handleDelete(exercise.id)}>
                                    <img src={minusIcon} alt="minus icon" />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </form>
        </div>
    );
}

export default LeftSection;
