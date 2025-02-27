import { useState, useEffect } from "react";
import "./UserAuth.css"
function UserAuth(){
    const [status, setStatus] = useState("Login")

    const handleStatus = (event) => {
        event.preventDefault()
        console.log(event.target.textContent)
        setStatus(event.target.textContent)
    }



    return (
        <div className="authMain">
            <form className="user-authentication-container">
                <div className="user-heading">
                    <span>{status == "Login" ? "Sign in" : "Sign up"}</span>
                    <div className="underline"></div>
                    </div>
                <div className="inputs">
                    <div className="input">
                        <input type="text" placeholder="Username"/>
                    </div>
                   
                    <div className="input">
                        <input type="password" placeholder="Password"/>
                    </div>
                {status === "Sign up" && 
                <>
                    <div className="input">
                        <input type="password" placeholder="Confirm password"/>
                    </div>

                    <div className="input">
                        <input type="email" placeholder="Email"/>
                    </div>
                </>
                }
                    
                </div>
                <div className = "submit-container">
                    <button onClick={(event) => handleStatus(event)}>Login</button>
                    
                </div>
                <div className="sign-up">
                        <button onClick={(event) => handleStatus(event)}>Sign up</button>
                    </div>
                
            </form>
        </div>

    )
}

export default UserAuth;