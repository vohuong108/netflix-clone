import React, { useState, useEffect } from 'react';
import requests from '../handleData/requests.js';
import axios from '../handleData/axios.js';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import '../assets/Banner.css';

function Banner() {
    const [movie, setMovie] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState("");
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    }

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchActionMovies);
            const idRand = Math.floor(Math.random() * (request.data.results.length - 1));

            setMovie(request.data.results[idRand]);
            return request;
        }

        fetchData();
    }, []);

    const handleClick = (movie) => {
        if(trailerUrl) {
            setTrailerUrl("");
        }
        else {
            movieTrailer( null, {id: true, tmdbId: movie.id} )
            .then( response => {
                // console.log(response);
                setTrailerUrl(response);
            })
        }
    }

    const closePopup = () => {
        setTrailerUrl("");
    }

    return (
        <div>
        <header className="banner"
        style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
            backgroundPosition: "center top",
        }}
        >
            <div className="banner__contents">
                <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>

                <div className="banner__buttons">
                    <button onClick={() => handleClick(movie)} className="banner__btn">Play</button>
                    <button className="banner__btn">My List</button>
                </div> 

                <h1 className="banner__description">{movie?.overview}</h1>
            </div>
            
        </header>
        <div className="banner__popup">
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            {trailerUrl && <button className="banner__popup_btn" onClick={() => closePopup()}>X</button>}
        </div>
        </div>
    )
}

export default Banner
