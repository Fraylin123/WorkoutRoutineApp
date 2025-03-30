import { useState } from 'react'

function Video({ vidId }) {
    const [showIframe, setShowIframe] = useState(false);
    return (
        <div className="video-container">
            {showIframe ?
                <iframe src={`https://www.youtube.com/embed/${vidId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                : vidId !== "None" ? <img src={`https://img.youtube.com/vi/${vidId}/hqdefault.jpg`} alt="Video thumbnail" style={{ cursor: "pointer" }} onClick={() => setShowIframe(true)} /> : <img src="https://preview.redd.it/959czh3iwjx41.png?auto=webp&s=c555e34cb7017fda681ce472f2ade1649b53b039" alt="placeholder" />
            }
        </div>
    )
}

export default Video;