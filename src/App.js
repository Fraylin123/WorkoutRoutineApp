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
    <div className='mainContainer'>
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
