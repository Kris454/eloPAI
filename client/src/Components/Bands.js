import "./bands.css";
import {useEffect, useState} from "react";

const Bands = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [bands, setBands] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/bands")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setIsLoaded(true);
                    setBands(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    return (
        <div className="bands">
            <div className="bandsTitles">
                <span className="bandsTitleSm">Zespoły:</span>
                <ul class='list-group'>
                    {bands.map(band => (
                        <li key={band.ID} class='list-group-item'>
                            {band.Nazwa}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Bands;