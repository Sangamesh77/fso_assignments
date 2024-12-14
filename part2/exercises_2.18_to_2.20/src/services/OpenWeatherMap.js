import axios from "axios"

const baseUrl = "https://api.openweathermap.org"

const weatherApi = "/data/2.5/weather"

const api_key = import.meta.env.VITE_SOME_KEY

const getWeather = (lat, lon) => {
    return axios.get(
        `${baseUrl}${weatherApi}`,
        {
            params: {
                lat: lat,
                lon: lon,
                units: 'metric',
                appid: api_key
            }
        }
    ).then(response => response.data)
}

export default{
    getWeather
}