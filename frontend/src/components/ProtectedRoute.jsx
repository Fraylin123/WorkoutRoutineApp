import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../assets/styles/ProtectedRoute.css';

function ProtectedRoute({ children }) {
    const { authenticated } = useContext(AuthContext);

    if (authenticated == null) {
        return (
            <div className="loadingPage" style={{ minHeight: '100vh' }}>
                <div className="loadingContainer">
                    <div class="loader"></div>
                    <div class="textLoader"></div>
                </div>
            </div>
        );
    }
    //console.log('Authentication is', authenticated);

    return authenticated ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
