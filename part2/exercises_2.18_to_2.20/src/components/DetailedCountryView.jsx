import { useEffect } from "react"
import { useState } from "react"
import OpenWeatherMap from "../services/OpenWeatherMap"

const DetailedCountryView = (props) => {
    
    const {country} = props
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        OpenWeatherMap.getWeather(country.latlng[0], country.latlng[1])
        .then(response => setWeather(response))
    }, [])

    const displayWeather = () => {
        if(weather){
            return(
                <>
                    <h2>Weather in {country.name.common}</h2>
                    <p>Temperature: {weather.main.temp} Celcius</p>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} width={200} height={200}/>
                    <p>Wind: {weather.wind.speed} m/s</p>
                </>
            )
        }
        else{
            return(
                <p>Fetching weather...</p>
            )
        }
    }

    if(country){
        return(
            <div>
                <h1>{country.name.common}</h1>
                <p>{`Capital: ${country.capital[0]}`}</p>
                <p>{`Area: ${country.area}`}</p>
                <h3>Languages</h3>
                <ul>
                {Object.values(country.languages).map(
                    language => <li key={language}>{language}</li>
                )}
                </ul>
                <img src={country.flags.svg} height={200} width={200}/>
                {displayWeather()}
            </div>
        )
    }
    else{
        return null
    }
}

export default DetailedCountryView