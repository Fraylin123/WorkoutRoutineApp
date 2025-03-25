import { Navigate } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";


function ProtectedRoute({children}) {
    const [authenticated, setAuthenticated] = useState(null)


    useEffect(()=> {
        axios.get("localhost:5000/exercises", {withCredentials:true}).then(()=> setAuthenticated(true)).catch(()=> setAuthenticated(false))

    }, [])
    

    if (authenticated == null){
        return (<p>Loading...</p>)
    }

    return authenticated ? children : <Navigate to="/WorkoutRoutineApp/"/>

}

export default ProtectedRoute;