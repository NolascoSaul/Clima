const API = {
    key: 'b97d125b03023da94835ae71232cbebe',
    url: 'https://api.openweathermap.org/data/2.5/weather?lang=es'
}

const get = (el) => document.getElementById(el);

const main = document.querySelector('main');
const formCiudad = get('formCiudad');
const inputCiudad = get('inputCiudad');
const ciudad = get('ciudad');
const temperatura = get('temperatura');
const clima = get('clima');
const fecha = get('fecha');
const imgTemp = get('imgTemperatura');

formCiudad.addEventListener("submit", showWeatherInfo, true);
window.addEventListener("load", () => {
    main.hidden = true;
})


async function getWeatherInfo(query) {
    try{
        const res = await fetch(API.url + '&q=' + query + "&appid=" + API.key);
        const data = await res.json();
        
        let infoClima = data.weather[0].description;
        let img = document.createElement('img');
        img.src = "img/temperatura.png";
        img.alt = "Temperatura";
        
        main.hidden = false;
        render(ciudad, data.name + ", " + data.sys.country);
        if(imgTemp.innerHTML == '') imgTemp.appendChild(img);
        render(temperatura, toCelsius(data.main.temp));
        render(clima, toMayus(infoClima));
        render(fecha, new Date().toLocaleDateString());
    }catch(e){
        console.log(e);
    }
}

function showWeatherInfo(event) {
    event.preventDefault();
    getWeatherInfo(inputCiudad.value);
}

function render(element, value) {
    element.innerHTML = value;
}

function toMayus(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function toCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}