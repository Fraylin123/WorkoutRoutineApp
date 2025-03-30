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

    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <AuthContext.Provider value={{
            authenticated, checkAuth}}>
            {children}
        </AuthContext.Provider>
        
    )

}
