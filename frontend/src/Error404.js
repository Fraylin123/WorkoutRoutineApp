import Miguel from "./marmot.jpg"

function Error404() {
    return (
        <div style={{ padding: "2rem", textAlign: "center"}}>
            <h1>404 - Page Not Found</h1>
            <img src={Miguel} alt="Miguel the Marmot" style={{maxWidth: "60%", maxHeight: "60%"}}/>
            <h2>Miguel the Marmot</h2>
            <span>This page doesn't exist buddy. By the way...you got crackers?</span>
        </div>
    );
}

export default Error404;