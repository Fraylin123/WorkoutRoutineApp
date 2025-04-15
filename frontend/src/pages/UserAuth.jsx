import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/UserAuth.css"
import axios from 'axios'
import { AuthContext } from "../context/AuthContext.jsx";
import Footer from "../components/Footer.jsx"

function UserAuth() {
    const [status, setStatus] = useState("Sign in")
    const [alternate, setAlternate] = useState("Sign up")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmationPassword, setConfirmationPassword] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate();
    const { checkAuth, authenticated } = useContext(AuthContext);
    const API_URL =  process.env.REACT_APP_API_URL;

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

        if (status === "Sign in") {
            try {
                const res = await axios.post(`${API_URL}/api/auth/login`, { username, password }, { withCredentials: true })

                console.log(res.data)
                await checkAuth()
                navigate("/home")

            } catch (error) {
                alert("Wrong credentials")
            }

        }
        else {
            if (password === confirmationPassword) {
                try {
                    const res = await axios.post(`${API_URL}/api/auth/register`, { username, password, email });
                    window.location.reload();
                } catch (error) {
                    console.log("The error is", error);
                }
            }
            else{
                alert("Passwords dont match")
            }
        }
    }

    useEffect(() => {
        if (authenticated) {
            navigate("/home")
        }

    }, [authenticated])

    return (
        <div className="authMain">
            <div className="user-authentication-container">
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="user-heading">
                        <span>{status === "Sign in" ? "Sign in" : "Sign up"}</span>
                        <div className="underline"></div>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            <input type="text" placeholder="Username" required onChange={(e) => setUsername(e.target.value)} value={username} />
                        </div>

                        {status === "Sign up" &&
                            <div className="input">
                                <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} value={email} />
                            </div>
                        }

                        <div className="input">
                            <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} value={password} />
                        </div>
                        {status === "Sign up" &&
                            <>
                                <div className="input">
                                    <input type="password" placeholder="Confirm password" onChange={(e) => { setConfirmationPassword(e.target.value) }} value={confirmationPassword} required />
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
            <Footer />
        </div>

    )
}

export default UserAuth;
