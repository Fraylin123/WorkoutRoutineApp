
import "./Footer.css"
import linkedIn from "./icons/linkedin.png"
import gitHub from "./icons/github.png"

function Footer() {
    return (

        <footer>
            <a><img src={linkedIn} alt="LinkedIn logo" /></a>
            <a><img src={gitHub} alt="Github logo" /></a>
            <p>© 2025 Fraylin Ayala</p>
        </footer>

    )
}

export default Footer