import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserAuth.css"
import axios from 'axios'
function UserAuth() {
    const [status, setStatus] = useState("Sign in")
    const [alternate, setAlternate] = useState("Sign up")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate();

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
                const res = await axios.post('http://localhost:5000/login', { username, password })
                console.log(res.data.message)
                //navigate("/WorkoutRoutineApp/Home")
            } catch (error) {
                alert("Wrong credentials")
            }

        }
        else {
            try {
                const res = await axios.post('http://localhost:5000/register', { username, password, email });
                navigate("/WorkoutRoutineApp")
            } catch (error) {
                console.log("The error is", error);
            }
        }
    }



return (
    <div className="authMain">
        <form className="user-authentication-container" onSubmit={handleSubmit}>
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

)
}

export default UserAuth;