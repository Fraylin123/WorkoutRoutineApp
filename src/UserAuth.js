import { useState, useEffect } from "react";
import "./UserAuth.css"
function UserAuth(){
    return (
        <div className="authMain">
            <form className="user-authentication-container">
                <div className="user-heading">
                    <span>Login</span>
                    <div className="underline"></div>
                    </div>
                <div className="inputs">
                    <div className="input">
                        <input type="text" placeholder="Name"/>
                    </div>
                    <div className="input">
                        <input type="email" placeholder="Email"/>
                    </div>
                    <div className="input">
                        <input type="password" placeholder="Password"/>
                    </div>
                    

                </div>
                <div className = "submit-container">
                    <button>Login</button>
                </div>
                
            </form>
        </div>

    )
}

export default UserAuth;