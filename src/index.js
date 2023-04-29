import debounce from 'lodash.debounce';
import './css/styles.css';
import Notiflix, { Notify } from 'notiflix';
import fetchCountries from './fetchCountries';    

const DEBOUNCE_DELAY = 300;

const form = document.querySelector("#search-box")
const countrieList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info")


form.addEventListener("input", debounce(onSerch, DEBOUNCE_DELAY));

function onSerch(evt) {
    
    const inputsCountryName = evt.target.value.trim();
    if (!inputsCountryName) {
        countryInfo.innerHTML = "";
        countrieList.innerHTML = "";
        return
    }
    fetchCountries(inputsCountryName)
        .then(data => {
            
            if (data.length > 10) {
                    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
                countryInfo.innerHTML = "";
                countrieList.innerHTML = "";
                    
                } else if (data.length <= 10 && data.length >= 2) {
                countrieList.innerHTML = createMarkupInfo(data);
                countryInfo.innerHTML = "";
                    
                    
            } else if (data.length === 1) {
                countryInfo.innerHTML = createMarkupList(data);
                countrieList.innerHTML = "";                  
                }
    })
            
        .catch(err => {
            Notiflix.Notify.failure("Oops, there is no country with that name");
            countryInfo.innerHTML = "";
            countrieList.innerHTML = "";
            
        })
}

function createMarkupList(arr) {
    return arr.map((countrie) => `<div>
    <div style="display: flex; align-items: center;">
    <img style = "width:50px"src="${countrie.flags.svg}"><b style="font-size:40px">${countrie.name.official}</b>
    </div>
    <p style="font-size:18px"><b>Capital: </b><span>${countrie.capital}</span></p>
    <p style="font-size:18px"><b>Population: </b><span>${countrie.population}</span></p>
    <p style="font-size:18px"><b>Languages: </b><span>${Object.values(countrie.languages)}</span></p>
    </div>`).join("")
}

function createMarkupInfo(arr) {
    return arr.map((countrie) => `<li style="list-style-type: none; display: flex; font-size: 22px; align-items: center; margin: 10px" value="${countrie.cca3}">
    <img style = "width:50px; margin-right: 5px" src="${countrie.flags.svg}"><span>${countrie.name.official}</span></li>`).join("")
}


