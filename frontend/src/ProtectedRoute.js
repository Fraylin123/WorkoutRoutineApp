import { Navigate } from "react-router-dom"
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";


function ProtectedRoute({children}) {
    const {authenticated} = useContext(AuthContext);

    if (authenticated == null){
        return (<p>Loading...</p>)
    }
    console.log("Authentication is", authenticated)

    return authenticated ? children : <Navigate to="/"/>

}

export default ProtectedRoute;