import './css/styles.css';
import debounce from "lodash.debounce";
import { Notify } from 'notiflix';
const DEBOUNCE_DELAY = 300;

const BASE_URL = "https://restcountries.com/v2/name";

// const emptyArr = [] ;
const saerchEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

// fetch('https://restcountries.com/v2/name/japan/').then(response=> {
//     return response.json();
// }).then(country => {console.log(country);})
//     .catch(error => {console.log(error);});



    
saerchEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

// clearInput();

function onInput(e){
    e.preventDefault();
    let search = saerchEl.value;
    // console.log(search);
    fetchCountries(search)
    .then(data => {console.log(data)
        createMarkup (data)})
    .catch(err => console.log(err));
    
};


function fetchCountries(name){
    
    const response = fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`);
    return response.then(resp => {
    if(!resp.ok){
        Notify.failure('Oops, there is no country with that name'), {
            timeout: 5000,
          };
        throw new Error(resp.statusText);
    }
    return resp.json()})
};

function createMarkup (arr){
    console.log(arr);
    if(arr.length > 10){
        // console.log('more then 10')
        
        Notify.info("Too many matches found. Please enter a more specific name.");
        return;
    }if(arr.length >= 2 && arr.length <= 10){
        // console.log('quantity 2-10');
        const markup = arr
        .map((country) => `<h2><img src="${country.flags.svg}" alt="flag-${country.name}" width="40px"> ${country.name}</h2> `)
        .join("");
        // let markup = arr.map(country => console.log(country.flags.svg ,country.name))
        return countryListEl.insertAdjacentHTML('beforeend', markup)
    }else{
        const markup = arr
        .map((country) => ` <h2>
        <img src="${country.flags.svg}" alt="flag-${country.name}" width="50px"> ${country.name}</h2> 
        <li>Capital: ${country.capital}</li>
        <li>Population: ${country.population}</li>
        <li>Languages: ${country.languages.map(l=> l.nativeName)}</li>`)
        .join("");
        return countryInfoEl.insertAdjacentHTML('beforeend', markup)
        // arr.map(country => console.log(country.flags.svg, country.name, country.capital, country.population, country.language))
    };
}
// function clearInput(){
//     countryListEl.remove();
//     countryInfoEl.remove();
//     console.log('test');
// };

