import React, { useEffect, useState } from "react";
import { GoLocation } from "react-icons/go";
import { MdClear } from "react-icons/md";


export const Weather = () => {

    const [city, setCity] = useState("chennai");
    const [data, setData] = useState();
    const [country, setCountry] = useState("")
    const [weather, setWeather] = useState("");

    const handleInput = (e) => {
        setCity(e.target.value)
    }

 

    useEffect(() => {
        const fetchApi = async () => {
            const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a07038c9dfa2c04fa6f474978b3ed73d`);
            const data = await res.json();
            setData(data.main);
            setWeather(data.weather[0])
            setCountry(data.sys.country);
        }
        fetchApi();
    }, [city]);

    return (
        <div className="container">

            <div className="search-box">
                <input
                    type="search"
                    placeholder="Search By City"
                    className="inputField"
                    name="city"
                    value={city}
                    onChange={handleInput}
                />
                <MdClear onClick={() => setCity("")} className="clear-icon" size="1.8rem" />
            </div>

            {data ? (
                <div>
                    <div className="info">
                        <h2 className="location"><GoLocation size="1.4rem" /> {city} , {country}</h2>

                        <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="weather-icon" />
                        <h1 className="temp">{data.temp}°C</h1>

                        <h3 className="tempmin_max">{data.temp_min}°C / {data.temp_max}°C | Feels like {data.feels_like}°C</h3>
                        <h3>{weather.description}</h3>
                    </div>

                </div>
            )
                : (<p className="error">No data Found</p>)}
        </div>
    )
}


