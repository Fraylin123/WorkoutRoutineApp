import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./UserAuth.css"
import axios from 'axios'
import { AuthContext } from "./AuthContext";



function UserAuth() {
    const [status, setStatus] = useState("Sign in")
    const [alternate, setAlternate] = useState("Sign up")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate();
    const { checkAuth } = useContext(AuthContext);

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
        setUsername("")
        setEmail("")
        setPassword("")
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (status == "Sign in") {
            try {
                const res = await axios.post('http://localhost:5000/login', { username, password }, { withCredentials: true })

                console.log(res.data)
                await checkAuth()
                navigate("/WorkoutRoutineApp/Home")


            } catch (error) {
                alert("Wrong credentials")
            }

        }
        else {
            try {
                const res = await axios.post('http://localhost:5000/register', { username, password, email });
                window.location.reload();
            } catch (error) {
                console.log("The error is", error);
            }
        }
    }



    return (
        <div className="authMain">
            <div className="user-authentication-container">
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="user-heading">
                        <span>{status == "Sign in" ? "Sign in" : "Sign up"}</span>
                        <div className="underline"></div>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} />
                        </div>

                        {status === "Sign up" &&
                            <div className="input">
                                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                            </div>
                        }

                        <div className="input">
                            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </div>
                        {status === "Sign up" &&
                            <>
                                <div className="input">
                                    <input type="password" placeholder="Confirm password" />
                                </div>
                            </>
                        }

                    </div>
                    
                    <div className="submit-container">
                        <button>{status}</button>

                    </div>

                    <div className="sign-up">
                        <button onClick={(event) => handleStatus(event)}>{alternate}</button>
                    </div>

                </form>
            </div>
        </div>

    )
}

export default UserAuth;