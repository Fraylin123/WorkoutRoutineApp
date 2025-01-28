
import "./Footer.css"
import linkedIn from "./icons/linkedin.png"
import gitHub from "./icons/github.png"

function Footer() {
    return (
        <footer>
            <div className="logos">
                <a href="https://www.linkedin.com/in/fraylinayala/" target="_blank"><img src={linkedIn} alt="LinkedIn logo" /></a>
                <a href="https://github.com/Fraylin123" target="_blank"><img src={gitHub} alt="Github logo" /></a>
            </div>
            <p>© 2025 Fraylin Ayala</p>
        </footer>


    )
}

export default Footer