//New Javascript trial for getting weather and wind for the website. Fetched and displayed wind which will come in handy to use

const radios = document.querySelectorAll('input');

const OPEN_URL = "http://api.weatherapi.com/v1/forecast.json?key=";
const OPEN_KEY = "0b5fdfe1f70b42f6946232056220106";
let current = "";
let feelslike= "";




//const body = document.querySelector("body");
const grid4 = document.querySelector("#grid4");
const titles = ["Weather", "Feels like", "Wind Speed", "Wind Gust", "Wind Direction"];



fetch("http://api.weatherapi.com/v1/forecast.json?key=0b5fdfe1f70b42f6946232056220106&q=Dunedin&days=7&aqi=no&alerts=no")
.then(res => res.json())
.then(d => { 

    for (let index = 0; index < titles.length; index++) {
        let div = document.createElement("div");
        div.innerHTML = titles[index];
        grid4.appendChild(div);
    }

    let tempdiv = document.createElement("div");
    tempdiv.innerHTML = `${d.current.temp_c}` + " °C";
    tempdiv.classList.add("test");
    grid4.appendChild(tempdiv);

    let feeldiv = document.createElement("div");
    feeldiv.innerHTML = `${d.current.feelslike_c}` + " °C"; 
    grid4.appendChild(feeldiv);

    let speeddiv = document.createElement("div");
    speeddiv.innerHTML =`${d.current.wind_kph}` + " kph";
    grid4.appendChild(speeddiv);

    let gustdiv = document.createElement("div");
    gustdiv.innerHTML =`${d.current.gust_kph}` + " kph";
    grid4.appendChild(gustdiv);

    let winddir = document.createElement("div");
    winddir.innerHTML =`${d.current.wind_dir}`;
    grid4.appendChild(winddir);



   submit.addEventListener('click', event => {
    if (celsius.checked) {
        tempdiv.innerHTML = d.current.temp_c + " °C";
        feeldiv.innerHTML = d.current.feelslike_c + " °C"; 
        }
    if (fahrenheit.checked) {
        tempdiv.innerHTML = celsiusToFah(d.current.temp_c) + " °F";
        feeldiv.innerHTML = celsiusToFah(d.current.feelslike_c) + " °F"
    }
    if (kilometers.checked) {
        gustdiv.innerHTML = d.current.gust_kph + " kph";
        speeddiv.innerHTML = d.current.wind_kph + " kph"; 
        }
    if (meters.checked) {
        gustdiv.innerHTML = kmStoMs(d.current.gust_kph).toFixed(2) + "m/s";
        speeddiv.innerHTML = kmStoMs(d.current.wind_kph).toFixed(2) + " m/s"; 
    }   
});

});







