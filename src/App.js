import logo from './logo.svg';
import './App.css';

import Navigation from './Navigation.js'
import RightSection from './RightSection.js'
import LeftSection from './LeftSection.js'


function App() {
    return (
        <>
            <Navigation />
            <h1 style={{ textAlign: 'center' }}>Workout Routine App</h1>
            <div className='routineType'>
                <button>PPL</button>
                <button>Upper Lower</button>
                <button>Bro Split</button>
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
