/* This is the file to put any function. Any type of conversion functions should go in this file*/

// const submit = document.getElementById("submit");
// const celsius = document.getElementById("celsius");
// const fahrenheit = document.getElementById("fahr");
// const kilometers = document.getElementById("kilometers");
// const meters = document.getElementById("meters");

// set the current weather units to the values held in localStorage
// or if localStorage values are null, use default values
let currentTempUnit = (localStorage.currentTempUnit == null) ? "celsius" : localStorage.currentTempUnit;
let currentWindUnit = (localStorage.currentWindUnit == null) ? "mps" : localStorage.currentWindUnit;

//Function to convert celsius to fahrenheit
function celsiusToFah(celsius) 
{
    let fahrenheit = celsius * 9 / 5 + 32;
    return fahrenheit.toFixed(2);
}


//Function to convert fahrenheit to celsius

function FtoC(fahrenheit){
    let celsius = fahrenheit*5/9 -32;
    return celsius.toFixed(2);
}

//Function to convert kelvin to Celsius

function kelvinToCelsius(valNum) {
    valNum = parseFloat(valNum);
    valNum = valNum- 273.15.toFixed(1); ;
    return valNum;
}

//Function to convert the wind direction degrees into direction sectors (specifically for the openweather api)
function convertWindDir(degrees){
    if(degrees > 45 && degrees < 90) return 'NE';
    if(degrees > 90 && degrees < 135) return 'E';
    if(degrees > 135 && degrees < 180) return 'SE';
    if(degrees > 180 && degrees < 225) return 'S';
    if(degrees > 225 && degrees < 270) return 'SW';
    if(degrees > 270 && degrees < 315) return 'W';
    if(degrees > 315 && degrees < 360) return 'NW';
    return 'N';
}

//Function to convert Meters per second wind speed to Kilometers
function mStoKms(meters){
    return meters*3.6.toFixed(2); // to fixed bit doesn't seem to work for some reason???
}


//Function to convert Kilometers wind speed to meters per second
function kmStoMs(kilometers){
    return kilometers*.36.toFixed(2);
}

//Function to convert Kilometers to knots wind speed
function kilometerToKnots(kilometers){
    return kilometers*.5399.toFixed(2);
}
// convert meters per second to knots
function mpsToKnots(mps) {
    return mps * 1.94384.toFixed(1);
  }


// build an object with fields for different units of temperature speed
function buildTemperatureObject(celsiusTemp)
{
    let temperatureObject = 
    {
        celsius: celsiusTemp,
        fahrenheit: celsiusToFah(celsiusTemp)
    };
    return temperatureObject;
}

// build an object with fields for different units of wind speed
function buildWindObject(windMps)
{
    let windObject = 
    {
        mps: windMps,
        kmph: windMps * 3.6,
        knot: mpsToKnots(windMps)
    };
    return windObject;
}

// set the chosen weather unit in local storage and update the values on the grid
function setCurrentUnit(storageKey, desiredUnit)
{
    localStorage.setItem(storageKey, desiredUnit);
    currentTempUnit = localStorage.currentTempUnit;
    currentWindUnit = localStorage.currentWindUnit;
    changeToCurrentUnit(".high_temperature", highTemperatureObjects, getTemperatureString);
    changeToCurrentUnit(".low_temperature", lowTemperatureObjects, getTemperatureString);
    changeToCurrentUnit(".wind_speed", windSpeedObjects, getWindString);
    changeToCurrentUnit(".wind_gust", windGustObjects, getWindString);

    //for currentweather.js 
    changeToCurrentUnit(".currentwind_gust", currentGustObjects, getWindString);
    changeToCurrentUnit(".currentwind_speed", currentWindObjects, getWindString);
    changeToCurrentUnit(".current_temperature", currentTempObjects, getTemperatureString);
    changeToCurrentUnit(".feelslike_temperature", currentFeelLikeObjects, getTemperatureString)
}


// round a number to a maximum or 'roundTo' places
function roundToOrLess(myNumber = 0, roundTo)  
{
    myNumber = parseFloat(myNumber);
    return parseFloat(myNumber.toFixed(roundTo));
}