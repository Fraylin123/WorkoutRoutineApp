import './App.css';

import Navigation from './Navigation.js'
import RightSection from './RightSection.js'
import LeftSection from './LeftSection.js'
import { useState } from "react";


function App() {
    const [routineValues, setRoutineValues] = useState([false,false,false]);
    const [fitnessValues, setFitnessValues] = useState([false,false,false]);

    const handleRoutineClick = (index) => {
        setRoutineValues((prev) => {
            return prev.map((_,i) => i === index);
        });
    }

    const handleFitnessClick = (index) => {
        setFitnessValues((prev) => {
            return prev.map((_,i) => i === index);
        });
    }


    return (
        <>
            <Navigation />
            <h1 style={{ textAlign: 'center' }}>Workout Routine App</h1>
            <div className='routineType'>
                <button onClick={() => handleRoutineClick(0)} style={{backgroundColor: routineValues[0] ? 'gray': 'black'}}>PPL</button>
                <button onClick={() => handleRoutineClick(1)} style={{backgroundColor: routineValues[1] ? 'gray': 'black'}}>Upper Lower</button>
                <button onClick={() => handleRoutineClick(2)} style={{backgroundColor: routineValues[2] ? 'gray': 'black'}}>Bro Split</button>
            </div>
        {routineValues.some(value => value === true) && (
            <div className="fitnessLevel">
                <button onClick={() => handleFitnessClick(0)} style={{backgroundColor: fitnessValues[0] ? 'gray': 'black'}}>Beginner</button>
                <button onClick={() => handleFitnessClick(1)} style={{backgroundColor: fitnessValues[1] ? 'gray': 'black'}}>Intermediate</button>
                <button onClick={() => handleFitnessClick(2)} style={{backgroundColor: fitnessValues[2] ? 'gray': 'black'}}>Advanced</button>
            </div>
        )
        }

            <div className='mainContainer'>
                <h3>Monday</h3>

                <div className='pairedContainer'>
                    <LeftSection />
                    <RightSection />
                </div>

                <h3>Tuesday</h3>

                <div className='pairedContainer'>
                    <LeftSection />
                    <RightSection />
                </div>

                <h3>Wednesday</h3>
                <div className='pairedContainer'>
                    <LeftSection />
                    <RightSection />
                </div>

                <h3>Thursday</h3>

                <div className='pairedContainer'>
                    <LeftSection />
                    <RightSection />
                </div>

                <h3>Friday</h3>

                <div className='pairedContainer'>
                    <LeftSection />
                    <RightSection />
                </div>

            </div>


            <div className='submit'>
                <button>Save</button>

            </div>
        </>
    )

}

export default App;
