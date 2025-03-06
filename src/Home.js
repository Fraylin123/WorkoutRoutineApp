import './Home.css';

import RightSection from './RightSection.js'
import LeftSection from './LeftSection.js'
import Result from "./Result.js"
import { useEffect } from "react";
import { useContext } from 'react';
import { WorkoutContext } from './WorkoutContext.js'

//Component for the Home section
function Home() {
    const {
        routineValues, setRoutineValues,
        fitnessValues, setFitnessValues,
        days, setDays,
        exerciseData, setExerciseData,
        exerciseJSON, setExerciseJSON,
        errors, setErrors,
        buttonClicked, setButtonClicked
    } = useContext(WorkoutContext);

    const handleRoutineClick = (index) => {
        setRoutineValues((prev) => {
            return prev.map((_, i) => i === index);
        });
    }

    const handleFitnessClick = (index) => {
        setFitnessValues((prev) => prev.map((_, i) => i === index))
    }

    const updateData = (index, exercise) => {
        const newData = [...exerciseData]
        newData[index] = exercise
        setExerciseData(newData)
    }

    const updateExerciseJSON = (index, item) => {
        setExerciseJSON((prev) => {
            const newJSON = [...prev]
            newJSON[index] = item || { day: days[index], exercises: [] }
            return newJSON
        })
    }

    const inputValidation = () => {
        //console.log("calling inputValidation")
        const newErrors = {};
        let hasError = false;
        exerciseJSON.forEach((dayData, dayIndex) => {
            if (!dayData || dayData.exercises.length === 0) {
                //console.log("Correct condition")
                return

            }; //Pre-check
            const exerciseErrors = []
            dayData.exercises.forEach((exercise, exerciseIndex) => { //Iterate over the exercises array
                if (!exercise.name || !exercise.sets || !exercise.reps) {
                    hasError = true
                    exerciseErrors[exerciseIndex] = {
                        id: exercise.id,
                        name: !exercise.name,
                        sets: !exercise.sets,
                        reps: !exercise.reps,
                    }
                }
                if (exercise.name && exercise.sets && exercise.reps) {
                    exerciseErrors[exerciseIndex] = {
                        id: exercise.id,
                        name: !exercise.name,
                        sets: !exercise.sets,
                        reps: !exercise.reps,
                    }
                }

            })
            if (Object.keys(exerciseErrors).length > 0) {
                newErrors[dayIndex] = exerciseErrors;
            }
        });

        setErrors(newErrors)
        return !hasError
    }

    const handleSaveClick = () => {
        //console.log(exerciseJSON)
        if (inputValidation()) {
            setButtonClicked(true)
        }
        else {
            alert("There are errors, please fix")
            //console.log("main errs", errors)
        }
    }

    const sendArray = (index, item) => {
        setErrors((prev) => ({
            ...prev,
            [index]: item,
        }))
    }

    //If it's a rest day, delete it so that it doesnt render
    useEffect(() => {
        const generateUniqueDays = (daysArray) => {
            const timestamp = Date.now();
            return daysArray.map((day, index) => ({ name: day, id: `${day}-${timestamp}-${index}` }));
        };

        if (routineValues[0] && fitnessValues[0]) {
            setDays(generateUniqueDays(["Monday - Push", "Wednesday - Pull", "Friday - Legs"]));
        } else if (routineValues[0] && fitnessValues[1]) {
            setDays(generateUniqueDays(["Monday - Push", "Tuesday - Pull", "Wednesday - Legs", "Friday - Push", "Saturday - Pull", "Sunday - Legs"]));
        } else if (routineValues[0] && fitnessValues[2]) {
            setDays(generateUniqueDays(["Monday - Push", "Tuesday - Pull", "Wednesday - Legs", "Thursday - Push", "Friday - Pull", "Saturday - Legs"]));
        } else if (routineValues[1] && fitnessValues[0]) {
            setDays(generateUniqueDays(["Monday - Upper", "Tuesday - Lower", "Thursday - Upper", "Friday - Lower"]));
        } else if (routineValues[1] && (fitnessValues[1] || fitnessValues[2])) {
            setDays(generateUniqueDays(["Monday - Upper", "Tuesday - Lower", "Wednesday - Upper", "Thursday - Lower", "Friday - Upper", "Saturday - Lower"]));
        } else if (routineValues[2] && fitnessValues[0]) {
            setDays(generateUniqueDays(["Monday - Chest, Shoulders, Triceps", "Wednesday - Back, Biceps", "Friday - Legs"]));
        } else if (routineValues[2] && fitnessValues[1]) {
            setDays(generateUniqueDays(["Monday - Chest", "Tuesday - Back", "Wednesday - Shoulder", "Thursday - Leg", "Friday - Arm"]));
        } else if (routineValues[2] && fitnessValues[2]) {
            setDays(generateUniqueDays(["Monday - Chest, Triceps", "Tuesday - Back, Biceps", "Wednesday - Legs", "Thursday - Shoulders, Arms", "Friday - Chest", "Saturday - Legs"]));
        }
    }, [routineValues, fitnessValues]);

    useEffect(() => {
        setExerciseJSON((prev) => {
            const resetJSON = [...prev]
            return days.map((day, index) => ({ day: day.name, exercises: resetJSON[index]?.exercises ? resetJSON[index].exercises : [{ id: 1, name: "", sets: "", reps: "" }, { id: 2, name: "", sets: "", reps: "" }, { id: 3, name: "", sets: "", reps: "" }, { id: 4, name: "", sets: "", reps: "" }, { id: 5, name: "", sets: "", reps: "" }] }))
        });
    }, [days]);

    return (
        <div className="main">
            <h1 style={{ textAlign: 'center' }}>Workout Routine App</h1>
            <div className='routineType'>
                <button onClick={() => handleRoutineClick(0)} style={{ backgroundColor: routineValues[0] ? 'gray' : 'black' }}>PPL</button>
                <button onClick={() => handleRoutineClick(1)} style={{ backgroundColor: routineValues[1] ? 'gray' : 'black' }}>Upper Lower</button>
                <button onClick={() => handleRoutineClick(2)} style={{ backgroundColor: routineValues[2] ? 'gray' : 'black' }}>Bro Split</button>
            </div>

            {routineValues.some(value => value === true) && (
                <div className="fitnessLevel">
                    <button onClick={() => handleFitnessClick(0)} style={{ backgroundColor: fitnessValues[0] ? 'gray' : 'black' }}>Beginner</button>
                    <button onClick={() => handleFitnessClick(1)} style={{ backgroundColor: fitnessValues[1] ? 'gray' : 'black' }}>Intermediate</button>
                    <button onClick={() => handleFitnessClick(2)} style={{ backgroundColor: fitnessValues[2] ? 'gray' : 'black' }}>Advanced</button>
                </div>
            )
            }

            <div className='mainContainer'>
                {days.map((currDay, index) => (
                    <div key={index}>
                        <h3>{currDay.name}</h3>
                        <div className="pairedContainer">
                            <LeftSection setExerciseData={(value) => updateData(index, value)} setJSON={(item) => updateExerciseJSON(index, item)} day={currDay} errors={errors[index] || []} setErrors={(item) => sendArray(index, item)} setButtonClicked={setButtonClicked} />
                            <RightSection data={exerciseData[index]} />
                        </div>
                    </div>

                ))
                }
            </div>

            {fitnessValues.some(value => value === true) &&
                <div className='submit'>
                    <button onClick={() => handleSaveClick()}>Save</button>
                </div>
            }

            {buttonClicked &&
                <Result exerciseData={exerciseJSON} />
            }

        </div>
    )
}

export default Home;