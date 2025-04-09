import data from "../assets/articles.json"
import Article from "../components/Article.jsx"
import Navigation from '../components/Navigation.jsx'
import Footer from "../components/Footer.jsx"

//Component for the Blog section
function Blog() {
    return (
        <div style={{minHeight:"100vh"}}>
            <Navigation />
            <h1 style={{ textAlign: "center", marginTop: "30px" }}>Health Blog</h1>
            <div className="blogContainer">
                {
                    Object.entries(data).map(([key, value], index) => (
                        <Article key={key} attributes={value} position={index % 2 === 0 ? "left" : "right"} />
                    ))
                }
            </div>
            <Footer />
            
        </div>
    )
}

export default Blog;