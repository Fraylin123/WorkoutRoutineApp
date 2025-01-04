import './App.css';

import Navigation from './Navigation.js'
import RightSection from './RightSection.js'
import LeftSection from './LeftSection.js'
import { useState, useEffect } from "react";


function App() {
    const [routineValues, setRoutineValues] = useState([false, false, false]);
    const [fitnessValues, setFitnessValues] = useState([false, false, false]);
    const [days, setDays] = useState([])
    const [data, setData] = useState(['', '', '', '', '', '', '']);
    const [exerciseJSON, setExerciseJSON] = useState([]) 
    const [errors, setErrors] = useState({})

    const handleRoutineClick = (index) => {
        setRoutineValues((prev) => {
            return prev.map((_, i) => i === index);
        });
    }

    const handleFitnessClick = (index) => {
        setFitnessValues((prev) => prev.map((_, i) => i === index))
    }

    const updateData = (index, exercise) => {
        const newData = [...data]
        newData[index] = exercise
        setData(newData)
    }

    const updateExerciseJSON = (index, item) => {
        setExerciseJSON((prev) => {
            const newJSON = [...prev]
            newJSON[index] = item || {day: days[index], exercises: [] }
            return newJSON
        })
    }

    const sendArray = (index, item) => {
        setErrors((prev) => ({
            ...prev,
            [index]: item,
        }))
    }

    const inputValidation = () => {
        console.log("calling inputValidation")
        const newErrors = {};
        let hasError = false;
        exerciseJSON.forEach((dayData, dayIndex) => {
            if (!dayData || dayData.exercises.length === 0){
                console.log("Correct condition")
                return

            } ; //Pre-check
            const exerciseErrors = []
            dayData.exercises.forEach((exercise, exerciseIndex) => { //Iterate over the exercises array
               if (!exercise.name || !exercise.sets || !exercise.reps){
                hasError = true
                exerciseErrors[exerciseIndex] = {
                    id: exercise.id,
                    name: !exercise.name,
                    sets: !exercise.sets,
                    reps: !exercise.reps,
                }
               }

            })
            if (Object.keys(exerciseErrors).length > 0){
                newErrors[dayIndex] = exerciseErrors; 
            }
        });

        setErrors(newErrors)
        return !hasError
    }

    const handleSaveClick = () => {
       console.log("Exercise JSON is: \n", exerciseJSON)
        if (inputValidation()){
            alert("No errors")
        }
        else{
            alert("There are errors, please fix")
        }
       
    }

    //If it's a rest day, delete it so that it doesnt render
    useEffect(() => {
        if (routineValues[0] && fitnessValues[0]) {  //PPL Beginner fitness levels
            setDays(["Monday - Push", "Wednesday - Pull", "Friday - Legs",])
        }
        else if (routineValues[0] && fitnessValues[1]) { //PPL Intermediate
            setDays(["Monday - Push", "Tuesday - Pull", "Wednesday - Legs", "Friday - Push", "Saturday - Pull", "Sunday - Legs"])
        }
        else if (routineValues[0] && fitnessValues[2]) { //PPL Advanced
            setDays(["Monday - Push", "Tuesday - Pull", "Wednesday - Legs", "Thursday - Push", "Friday - Pull", "Saturday - Legs"])
        }
        else if (routineValues[1] && fitnessValues[0]) { //Upper-Lower Beginner
            setDays(["Monday - Upper", "Tuesday - Lower",  "Thursday - Upper", "Friday - Lower"])
        }
        else if (routineValues[1] && (fitnessValues[1] || fitnessValues[2])) { //Upper-Lower Intermediate and advanced
            setDays(["Monday - Upper", "Tuesday - Lower", "Wednesday - Upper", "Thursday - Lower", "Friday - Upper", "Saturday - Lower"])
        }
        else if (routineValues[2] && fitnessValues[0]) { //Bro Split Beginner
            setDays(["Monday - Chest, Shoulders, Triceps", "Wednesday - Back, Biceps", "Friday - Legs"])
        }
        else if (routineValues[2] && fitnessValues[1]) { //Bro Split Intermediate
            setDays(["Monday - Chest", "Tuesday - Back", "Wednesday - Shoulder", "Thursday - Leg", "Friday - Arm"])
        }
        else if (routineValues[2] && fitnessValues[2]) { //Bro Split Advanced
            setDays(["Monday - Chest, Triceps", "Tuesday - Back, Biceps", "Wednesday - Legs", "Thursday - Shoulders, Arms", "Friday - Chest", "Saturday - Legs"])
        }

    }, [routineValues, fitnessValues])


    return (
        <>
            <Navigation />
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
                        <h3>{currDay}</h3>
                        <div className="pairedContainer">
                            <LeftSection setData={(value) => updateData(index, value)} setJSON={(item) => updateExerciseJSON(index, item)}  day = {currDay} errors= {errors[index] || {}} setErrors={(item) => sendArray(index, item)} />
                            <RightSection data={data[index]} />
                        </div>
                    </div>

                ))
                }
            </div>
            {fitnessValues.some(value => value === true) &&
            <div className='submit'>
                <button onClick = {() => handleSaveClick() }>Save</button>

            </div>
            }  
        </>
    )

}

export default App;


/*
Data format:

[{day: Monday - Push
exercisesData: [{exerciseName: Cable Crunch , sets: 3 , reps: 12}, {}, {}]},
 {},
{}]

*/