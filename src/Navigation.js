import './Navigation.css';
import { Link } from 'react-router-dom';

//Component for the navigation bar
function Navigation() {
    return (
        <div className='nav'>
            <Link to="/WorkoutRoutineApp/home">Home</Link>
            <Link to="/WorkoutRoutineApp/browse">Browse</Link>
            <Link to="/WorkoutRoutineApp/blog">Blog</Link>
        </div>
    )
}

export default Navigation