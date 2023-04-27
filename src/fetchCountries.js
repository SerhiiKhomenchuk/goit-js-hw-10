
const BASE_URL = 'https://restcountries.com/v3.1/name/';


export default function fetchCountries(countryName) {
    const URL = `${BASE_URL}${countryName}`
    return fetch(URL).then((resp) => { 
        
        if (!resp.ok) {
           throw new Error(resp.statusText)
        }
        
        return resp.json()
   }) 
}

 