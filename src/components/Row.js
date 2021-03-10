import React, { useState, useEffect } from 'react';
import axios from '../handleData/axios.js';
import '../assets/Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
const base_url = "https://image.tmdb.org/t/p/original";

const Row = ({ title, fetchUrl, isLargeRow, id_count }) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            // console.log(request);
            return request;
        }
        
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    }

    const handleClick = (movie) => {
        if(trailerUrl) {
            setTrailerUrl("");
        }
        else {
            movieTrailer( null, {id: true, tmdbId: movie.id} )
            .then( response => {
                console.log(response);
                setTrailerUrl(response);
            })
        }
    }

    const closePopup = () => {
        setTrailerUrl("");
    }

    function scrollHorizontally(element, change, duration) {
        var start = element.scrollLeft,
            currentTime = 0,
            increment = 20;
            
            // console.log(start)
            
        var animateScroll = function(){        
            currentTime += increment;
            var val = Math.easeInOutQuad(currentTime, start, change, duration);
            element.scrollLeft = val;
            if(currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }
    
    //t = current time
    //b = start value
    //c = change in value
    //d = duration
    Math.easeInOutQuad = function (t, b, c, d) {
      t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };

    return (
        <div className="row">
            <h2>{title}</h2>
            <div id={`content${id_count}`} className="row__posters">
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        className={`row__poster_img ${isLargeRow && "row__poster_img_large"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name}
                        onClick={() => handleClick(movie)}
                    />
                )) }
            </div>
            <div className="row__scroll">
                <button className="btn__scroll-btn left-btn" onClick={() => scrollHorizontally(document.getElementById(`content${id_count}`), -300, 1000)}>{"<"}</button>
                <button className="btn__scroll-btn right-btn" onClick={() => scrollHorizontally(document.getElementById(`content${id_count}`), 300, 1000)}>{">"}</button>
            </div>
            <div className="row__popup">
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
                {trailerUrl && <button className="row__popup_btn" onClick={() => closePopup()}>X</button>}
            </div>
        </div>
    )
}

export default Row;
