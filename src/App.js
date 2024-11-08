import './App.css';

import Navigation from './Navigation.js'
import RightSection from './RightSection.js'
import LeftSection from './LeftSection.js'
import { useState } from "react";


function App() {
    const [routineValues, setRoutineValues] = useState([false,false,false])
    const [fitnessValues, setFitnessValues] = useState([false,false,false])

    const handleClick = (event) => {
        setRoutineValues([])
        alert("Button clicked");
        alert("The value is: " + event.target.value);

    }
    return (
        <>
            <Navigation />
            <h1 style={{ textAlign: 'center' }}>Workout Routine App</h1>
            <div className='routineType'>
                <button onClick={handleClick} >PPL</button>
                <button onClick={handleClick}>Upper Lower</button>
                <button onClick={handleClick}>Bro Split</button>
            </div>

            <div className="fitnessLevel">
                <button>Beginner</button>
                <button>Intermediate</button>
                <button>Advanced</button>
            </div>

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
