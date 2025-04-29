import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(null);
    const API_URL =  process.env.REACT_APP_API_URL;

    const checkAuth = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/exercises`, { withCredentials: true });
            setAuthenticated(true)
        } catch (error) {
            console.log('Error', error);
            setAuthenticated(false);
        }
    };

    const logout = async () => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
            setAuthenticated(false);
            window.location.href = '/';
        } catch (error) {
            console.log('Error', error);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                authenticated,
                checkAuth,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
