import '../assets/styles/Navigation.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

//Component for the navigation bar
function Navigation() {
    const { logout } = useContext(AuthContext);
    return (
        <div className="nav">
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/browse">Browse</Link>
                </li>
                <li>
                    <Link to="/blog">Blog</Link>
                </li>
                <li>
                    <span onClick={logout}>Logout</span>
                </li>
            </ul>
        </div>
    );
}

export default Navigation;
