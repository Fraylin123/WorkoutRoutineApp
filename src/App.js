import logo from './logo.svg';
import './App.css';

import Navigation from './Navigation.js'
import RightSection from './RightSection.js'
import LeftSection from './LeftSection.js'


function App() {
    return(
    <>
    <Navigation />
    <h1 style={{textAlign:'center'}}>Workout Routine App</h1>
    
    <div className='routineType'>
                <label>
                    <input type='radio' value='PPL' id='ppl' />
                    PPL
                </label>
                <label>
                    <input type='radio' />
                    Upper Lower
                </label>
                <label>
                    <input type='radio' />
                    Bro Split
                </label>

     </div>
    <div className='mainContainer'>
    <div className = 'pairedContainer'>
    <h3>Monday</h3>
    <LeftSection />
    <RightSection />
    </div>
    <h3>Tuesday</h3>
    <LeftSection />
    <RightSection />
    <h3>Wednesday</h3>
    <LeftSection />
    <RightSection />
    <h3>Thursday</h3>
    <LeftSection />
    <RightSection />
    <h3>Friday</h3>
    <LeftSection />
    <RightSection />
   
    </div>
    <div className='submit'>
        <button>Save</button>

    </div>
    </>
    )
  
}

export default App;
