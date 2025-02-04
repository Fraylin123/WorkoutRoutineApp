import Navigation from './Navigation.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Home.js"
import Browse from "./Browse.js"
import Blog from "./Blog.js"
import Footer from "./Footer.js"

import { WorkoutProvider } from './WorkoutContext.js';

function App() {
    return (
        <div className="root">
            <WorkoutProvider>
            <Router>
                <Navigation />
                <Routes>
                    <Route path="/WorkoutRoutineApp" element={<Home />} />
                    <Route path="/WorkoutRoutineApp/browse" element={<Browse />} />
                    <Route path="/WorkoutRoutineApp/blog" element={<Blog />} />
                </Routes>
                <Footer />

            </Router>
            </WorkoutProvider>
        </div>
    )

}

export default App;