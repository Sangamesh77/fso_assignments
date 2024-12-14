import { useEffect, useState } from 'react'
import RestCountries from './services/RestCountries'
import CountryFilteredDisplay from './components/CountryFilteredDisplay'
import DetailedCountryView from './components/DetailedCountryView'
import OpenWeatherMap from './services/OpenWeatherMap'

const App = () => {

  const [countries, setCountries] = useState(null)
  const [countryFilter, setCountryFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(
    () => {
      RestCountries.getAllCountries()
      .then(response => {
        setCountries(response)
        console.log(response)
      })
      .catch(error =>{
        alert(`Failed to fetch countries, please refresh the page to try again, error: ${error}`)
      }
      )

      OpenWeatherMap.getWeather(29.5, 45.75)
      .then(response => console.log(response))

    }, [])

    const handleFilterChange = (event) => {
      setCountryFilter(event.target.value)
      setSelectedCountry(null)
    }

    const handleCountrySelect = () => {
    if(selectedCountry){
      return(
        <DetailedCountryView country={selectedCountry}/>
      )
    }
    else{
      return(
        <CountryFilteredDisplay filterText={countryFilter} countries={countries} selectCountrySetter={setSelectedCountry}/>
      )
    }
  }

    if(countries === null){
      return(
        <h3>Fetching countries, please wait</h3>
      )
    }
    else{
      return(
        <div>
          Find countries: <input value={countryFilter} onChange={event => handleFilterChange(event)}/>
          {handleCountrySelect()}
        </div>
      )
    }
}

export default App
