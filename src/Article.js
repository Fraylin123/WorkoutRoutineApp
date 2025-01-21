import "./Article.css"

function Article({attributes, position}){
    
    return(
        <div className="articleContainer" style={{flexDirection: position === "left" ? "row" : "row-reverse"}}>
            <img src={attributes.img.src} style={attributes.img.style} alt="fillerImage" />
            <div className="textSection">
                <span>{attributes.date}</span>
                <h2>{attributes.title}</h2>
                <p>{attributes.description}</p>
                <span className="readMore">Read More</span>
            </div>
        </div>
    )
}

export default Article;