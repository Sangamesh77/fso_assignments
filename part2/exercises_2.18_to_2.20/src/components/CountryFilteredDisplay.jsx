import { useEffect, useState } from "react"
import DetailedCountryView from './DetailedCountryView'

const CountryFilteredDisplay = (props) => {

    const {filterText, countries, selectCountrySetter} = props
    const filteredCountries = filterText != '' ? countries.filter(
        country => country.name.common.toLowerCase().startsWith(filterText)
    ) : []
    const listCountries = (filteredCountries) => {
        return filteredCountries.map(country => {
            return(
                <li key={country.name.common}>
                    {country.name.common}
                    <button onClick={() => selectCountrySetter(country)}>show</button>
                </li>
            )
        })
    }

    if(filteredCountries.length > 10){
        return(<p>Too many matches, please continue typing</p>)
    }
    else if(filteredCountries.length != 1 ){
        return(
            <ul>
            {listCountries(filteredCountries)}
            </ul>
        )
    }
    else if(filteredCountries.length == 1){
        return(<DetailedCountryView country={filteredCountries[0]}/>)
    }
}

export default CountryFilteredDisplay