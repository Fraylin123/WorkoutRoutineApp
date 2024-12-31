import './App.css';

import Navigation from './Navigation.js'
import RightSection from './RightSection.js'
import LeftSection from './LeftSection.js'
import { useState, useEffect } from "react";



function App() {
    const [routineValues, setRoutineValues] = useState([false, false, false]);
    const [fitnessValues, setFitnessValues] = useState([false, false, false]);
    const [activeExercises, setActiveExercises] = useState({})
    const [days, setDays] = useState([])
    const [data, setData] = useState(['', '', '', '', '', '', '']);


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

    useEffect(() => {
        if (routineValues[0] && fitnessValues[0]) {  //PPL Beginner fitness levels
            console.log("Inside")
            setDays(["Monday - Push", "Tuesday - Rest", "Wednesday - Pull", "Thursday - Rest", "Friday - Legs", "Saturday - Rest", "Sunday - Rest"])
        }
        else if (routineValues[0] && fitnessValues[1]) { //PPL Intermediate
            setDays(["Monday - Push", "Tuesday - Pull", "Wednesday - Legs", "Thursday - Rest", "Friday - Push", "Saturday - Pull", "Sunday - Legs"])
        }
        else if (routineValues[0] && fitnessValues[2]) { //PPL Advanced
            setDays(["Monday - Push", "Tuesday - Pull", "Wednesday - Legs", "Thursday - Push", "Friday - Pull", "Saturday - Legs", "Sunday - Rest"])
        }
        else if (routineValues[1] && fitnessValues[0]) { //Upper-Lower Beginner
            setDays(["Monday - Upper", "Tuesday - Lower", "Wednesday - Rest", "Thursday - Upper", "Friday - Lower", "Saturday - Rest", "Sunday - Rest"])
        }
        else if (routineValues[1] && (fitnessValues[1] || fitnessValues[2])) { //Upper-Lower Intermediate and advanced
            setDays(["Monday - Upper", "Tuesday - Lower", "Wednesday - Upper", "Thursday - Lower", "Friday - Upper", "Saturday - Lower", "Sunday - Rest"])
        }
        else if (routineValues[2] && fitnessValues[0]) { //Bro Split Beginner
            setDays(["Monday - Chest, Shoulders, Triceps", "Tuesday - Rest", "Wednesday - Back, Biceps", "Thursday - Rest", "Friday - Legs", "Saturday - Rest", "Sunday - Rest"])
        }
        else if (routineValues[2] && fitnessValues[1]) { //Bro Split Intermediate
            setDays(["Monday - Chest", "Tuesday - Back", "Wednesday - Shoulder", "Thursday - Leg", "Friday - Arm", "Saturday - Rest", "Sunday - Rest"])
        }
        else if (routineValues[2] && fitnessValues[2]) { //Bro Split Advanced
            setDays(["Monday - Chest, Triceps", "Tuesday - Back, Biceps", "Wednesday - Legs", "Thursday - Shoulders, Arms", "Friday - Chest", "Saturday - Legs", "Sunday - Rest"])
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
                {days.map((day, index) => (
                    <div key={index}>
                        <h3>{day}</h3>
                        <div className="pairedContainer">
                            <LeftSection setData={(value) => updateData(index, value)} />
                            <RightSection data={data[index]} />
                        </div>
                    </div>

                ))

                }
            </div>

            <div className='submit'>
                <button>Save</button>

            </div>
        </>
    )

}

export default App;
