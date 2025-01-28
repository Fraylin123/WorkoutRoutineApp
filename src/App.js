import './App.css';

import Navigation from './Navigation.js'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from "./Home.js"
import Browse from "./Browse.js"
import Blog from "./Blog.js"
import Footer from "./Footer.js"

function App() {
  
    return (
        <div className= "root">
        <Router>
            <Navigation />
            <Routes>
                <Route path="/WorkoutRoutineApp" element = {<Home />} />
                <Route path="/WorkoutRoutineApp/browse" element = {<Browse />} />
                <Route path="/WorkoutRoutineApp/blog" element = {<Blog />} />
            </Routes>
            <Footer />
           
        </Router>
        </div>
    )

}

export default App;