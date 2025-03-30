import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [authenticated, setAuthenticated] = useState(null)
  

    const checkAuth = async () => {
        try {
            const response = await axios.get("http://localhost:5000/exercises", { withCredentials: true })
            setAuthenticated(true)

        } catch (error){
            console.log("erorr found", error)
            setAuthenticated(false)
        }

    }

    const logout = async () => {
        try{
            const response = await axios.post("http://localhost:5000/logout", {withCredentials: true});
            setAuthenticated(false);
            window.location.href = "/WorkoutRoutineApp";


        }
        catch (error){
            console.log("Error", error)

        }
    }

    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <AuthContext.Provider value={{
            authenticated, checkAuth, logout}}>
            {children}
        </AuthContext.Provider>
        
    )

}
