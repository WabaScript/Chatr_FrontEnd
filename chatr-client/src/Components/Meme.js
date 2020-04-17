import React from 'react'
import { useState, useEffect } from 'react';

const Meme = props => {
    
    
    let memeUrls = props.memes.map( obj => obj.url)
    let randomMeme = memeUrls[Math.floor(Math.random() * memeUrls.length)];

    const [meme, setMeme] = useState(0);


    return (
        <div className="textStuff">
            Welcome To Chatr!! 
            Here is a random Meme.
             What's your caption?
            <img onClick={() => setMeme(randomMeme)} className="img" src={randomMeme} />
        </div>
    )

}

export default Meme;