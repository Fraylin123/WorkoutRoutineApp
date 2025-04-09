import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Browse from './pages/Browse.jsx';
import Blog from './pages/Blog.jsx';
import UserAuth from './pages/UserAuth.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { WorkoutProvider } from './context/WorkoutContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import Error404 from './pages/Error404.jsx';

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
                    </Router>
                </WorkoutProvider>
            </AuthProvider>
        </div>
    );
}

export default App;