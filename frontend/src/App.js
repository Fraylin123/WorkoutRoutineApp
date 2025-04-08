import Navigation from './Navigation.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Home.js"
import Browse from "./Browse.js"
import Blog from "./Blog.js"
import Footer from "./Footer.js"
import UserAuth from './UserAuth.js';
import ProtectedRoute from './ProtectedRoute.js';
import { WorkoutProvider } from './WorkoutContext.js';
import { AuthProvider } from "./AuthContext.js"
import Error404 from './Error404.js';

function App() {
    return (
        <div className="root">
            <AuthProvider>
                <WorkoutProvider>
                    <Router>
                        <Routes>
                            <Route path="/" element={<UserAuth />} />
                            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                            <Route path="/browse" element={<ProtectedRoute><Browse /></ProtectedRoute>} />
                            <Route path="/blog" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
                            <Route path="*" element={<Error404/>}/>
                        </Routes>
                       <Footer />
                    </Router>
                </WorkoutProvider>
            </AuthProvider>
        </div>
    )
}

export default App;