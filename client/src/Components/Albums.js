import "./albums.css";
import {useEffect, useState} from "react";

const Albums = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [albums, setAlbums] = useState([]);
    const [album, setAlbum] = useState(0);
    const [tracks, setTracks] = useState([]);
    const [spotify, setSpotify] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/bands/1")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setIsLoaded(true);
                    setAlbums(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        fetch("http://localhost:3000/api/albums/tracks/1")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setIsLoaded(true);
                    setTracks(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        fetch("http://localhost:3000/api/albums/spotify/1")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setIsLoaded(true);
                    setSpotify(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    return (
        <div className="albums">
            <div className="albumsTitles">
                <span className="albumsTitleSm">Albumy:</span>
                {albums.map(album => (
                    <button type="button" className="btn btn-secondary">{album.Nazwa}</button>
                ))}
            </div>
            <div className="albumsContent">
                <div className="albumsContent-list" >
                    Info: {albums.map(album => (
                        album.Nazwa
                    ))} <br/>
                    Data Wydania: {albums.map(album => (
                    album.Data_wydania
                    ))} <br/>
                    Gatunek: {albums.map(album => (
                    album.Gatunek
                    ))} <br/><br/>
                    <h4>Lista utworów:</h4>
                    <ol>
                        {tracks.map(track => (
                            <li key={track.ID} >
                                {track.Nazwa} {track.Czas_trwania}
                            </li>
                        ))}
                    </ol>
                </div>
                    <div className="albumsContent-cover">
                        <img className="image" src={spotify.albumCoverUrl}></img><br/>
                        <a href={spotify.albumLink}><img src="https://cdn.iconscout.com/icon/free/png-64/spotify-36-721973.png"></img></a>
                    </div>

            </div>
        </div>
    );
}

export default Albums;