import React from 'react'
import { useState, useEffect } from 'react';

const Meme = props => {
    
    
    // let memeUrls = props.memes.map( obj => obj.url)
    // let randomMeme = memeUrls[Math.floor(Math.random() * memeUrls.length)];

    const [meme, setMeme] = useState(props.memes);

    return (
        <div className="textStuff">
            Welcome To Chatr!! 
            <br/>
            Here is a random Gif.
             What's your caption?
            <img onClick={() => props.newMeme()} className="img" src={props.memes} />
            <span className={"simple"}>Powered by Giphy</span>
        </div>
    )

}

export default Meme;