import { useState, useEffect } from "react";
import "./UserAuth.css"
function UserAuth() {
    const [status, setStatus] = useState("Sign in")
    const [alternate, setAlternate] = useState("Sign up")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleStatus = (event) => {
        event.preventDefault()

        if (event.target.textContent === "Sign up") {
            if (alternate !== "Sign in")
                setAlternate("Sign in")
        }
        else {
            setAlternate("Sign up")
        }
        setStatus(event.target.textContent)
    }

    /*
    const handleSubmit = async(event) => {
        e.preventDefault()

    }
    */

    return (
        <div className="authMain">
            <form className="user-authentication-container">
                <div className="user-heading">
                    <span>{status == "Sign in" ? "Sign in" : "Sign up"}</span>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <input type="text" placeholder="Username" />
                    </div>

                    <div className="input">
                        <input type="password" placeholder="Password" />
                    </div>
                    {status === "Sign up" &&
                        <>
                            <div className="input">
                                <input type="password" placeholder="Confirm password" />
                            </div>

                            <div className="input">
                                <input type="email" placeholder="Email" />
                            </div>
                        </>
                    }

                </div>
                <div className="submit-container">
                    <button onClick={(event) => handleStatus(event)}>{status}</button>

                </div>
                
                <div className="sign-up">
                    <button onClick={(event) => handleStatus(event)}>{alternate}</button>
                </div>

            </form>
        </div>

    )
}

export default UserAuth;