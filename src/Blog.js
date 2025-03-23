import data from "./articles.json"
import Article from "./Article"
import Navigation from './Navigation.js'

//Component for the Blog section
function Blog() {
    return (
        <div>
            <Navigation />
            <h1 style={{ textAlign: "center", marginTop: "30px" }}>Health Blog</h1>
            <div className="blogContainer">
                {
                    Object.entries(data).map(([key, value], index) => (
                        <Article key={key} attributes={value} position={index % 2 === 0 ? "left" : "right"} />
                    ))
                }
            </div>
        </div>
    )
}

export default Blog;