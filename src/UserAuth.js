import { useState, useEffect } from "react";
import "./UserAuth.css"
function UserAuth(){
    const [status, setStatus] = useState("login")



    return (
        <div className="authMain">
            <form className="user-authentication-container">
                <div className="user-heading">
                    <span>Sign in</span>
                    <div className="underline"></div>
                    </div>
                <div className="inputs">
                    <div className="input">
                        <input type="text" placeholder="Username"/>
                    </div>
                   
                    <div className="input">
                        <input type="password" placeholder="Password"/>
                    </div>

                    <div className="input">
                        <input type="password" placeholder="Confirm password"/>
                    </div>

                    <div className="input">
                        <input type="email" placeholder="Email"/>
                    </div>
                    
                </div>
                <div className = "submit-container">
                    <button>Login</button>
                    
                </div>
                <div className="sign-up">
                        <button>Sign up</button>
                    </div>
                
            </form>
        </div>

    )
}

export default UserAuth;