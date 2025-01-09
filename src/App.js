import './App.css';

import Navigation from './Navigation.js'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from "./Home.js"
import Browse from "./Browse.js"

function App() {
  
    return (
        <Router>
            <Navigation />

            <Routes>
                
                <Route path="/" element = {<Home />} />
                <Route path="/browse" element = {<Browse />} />
            </Routes>
           
        </Router>
    )

}

export default App;