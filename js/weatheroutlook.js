const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ba0989e4bemsh1e524a458a71fb8p1d5dd9jsn4aac4d481f22',
		'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
	}
};

let body = document.querySelector("body");
let weekendData = document.querySelector(".weather_outlook");
let highTemperatureObjects = [];
let lowTemperatureObjects = [];
let windSpeedObjects = [];
let windGustObjects = [];

//let titles = ["Date", "Conditions", "Chance of rain", "High", "Low", "Wind Speed", "Wind Gust", "Wind Direction"];

fetch('https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily?lat=-45.874&lon=170.50', options)
.then(response => response.json())
.then(response => 
    
    
    response["data"].filter(day => day.datetime == formatDate(testSaturday(new Date())) || day.datetime == formatDate(testSunday(new Date())))
    .forEach((data, i) => {

        //console.log(data);

    let weekend_date = document.querySelector(".sat_date");
    let weekend_con = document.querySelector(".sat_condition");
    let weekend_pop = document.querySelector(".sat_pop");
    let weekend_high = document.querySelector(".sat_high");
    let weekend_low = document.querySelector(".sat_low");
    let weekend_dir = document.querySelector(".sat_dir");
    let weekend_speed = document.querySelector(".sat_speed");
    let weekend_gust = document.querySelector(".sat_gust");

    //date that needs to be formatted to say the day
    let datetime = document.createElement("td");
    datetime.innerHTML = reformatDate(data.datetime);
    weekend_date.append(datetime);

    
    // weather conditions, like partly cloudy or patchy rain
    let conditions = document.createElement("td");
    conditions.innerHTML = `${data.weather.description}`;
    weekend_con.append(conditions);

    //chance of precipitation
    let chanceofRain = document.createElement("td");
    chanceofRain.innerHTML = `${data.pop}` + " %";
    weekend_pop.appendChild(chanceofRain);

    // fetching  and appending the high temperature
    let hightempdiv = document.createElement("td");
    highTemperatureObjects.push(buildTemperatureObject(data.max_temp));
    hightempdiv.innerHTML = getTemperatureString(highTemperatureObjects[i]);
    hightempdiv.classList.add("high_temperature");
    weekend_high.appendChild(hightempdiv);

    // fetching and appending low temperature
    let lowtempdiv = document.createElement("td");
    lowTemperatureObjects.push(buildTemperatureObject(data.min_temp));
    lowtempdiv.innerHTML = getTemperatureString(lowTemperatureObjects[i]);
    // lowtempdiv.style.color = "blue";
    weekend_low.appendChild(lowtempdiv);


    let speeddiv = document.createElement("td");
    windSpeedObjects.push(buildWindObject(data.wind_spd));
    speeddiv.innerHTML = getWindString(windSpeedObjects[i])
    speeddiv.classList.add("wind_speed");
    weekend_speed.appendChild(speeddiv);

    let gustdiv = document.createElement("td");
    windGustObjects.push(buildWindObject(data.wind_gust_spd));
    gustdiv.innerHTML = getWindString(windGustObjects[i])
    gustdiv.style.color = "red";
    weekend_gust.appendChild(gustdiv);

    let windDirection = document.createElement("td");
    windDirection.innerHTML = `${data.wind_cdir}`; 
    weekend_dir.appendChild(windDirection);

/************************************
 WEATHER OUTLOOK ALERTS - WIND SPEED
************************************/
    windSpeedWarning = 25;

    let windspd = data.wind_spd
    let gustspd = data.wind_gust_spd

    let warnings = document.querySelector(".warnings");
    
    if(windSpeedWarning >= windspd || windSpeedWarning >= gustspd)
    {
        /**********************************************************************
         * Commented out the outlook alert as it's not completely functioning * 
        ***********************************************************************/

        
            // let severeWindDiv = document.createElement('div');

            //     severeWindDiv.classList.add('severeWind')
            //     severeWindDiv.style.background = "red";
            //     severeWindDiv.style.width = "30%";
            //     severeWindDiv.style.zIndex = '1';
            //     severeWindDiv.style.borderRadius = "10px";
            //     severeWindDiv.style.display = "flex";
            //     severeWindDiv.style.flexDirection = "column";

            //     warnings.append(severeWindDiv);

            //     let alertHeader = document.createElement("p")
            //     alertHeader.innerHTML = "Severe wind warning";
            //     document.querySelector(".severeWind").append(alertHeader)
            //     alertHeader.style.textAlign = "center";
            //     alertHeader.style.fontWeight = "bold";
            //     alertHeader.style.fontSize = "24px";

            //     // first alert 
            //     let message = document.createElement("p")
            //     message.innerHTML = " The current wind speed today is high " + windString;
            //     document.querySelector(".severeWind").append(alertMessage)
            //     message.style.textAlign = "center";
            //     message.style.fontWeight = "bold";

            //     let hideAlert = document.createElement("button")
            //     document.querySelector(".severeWind").append(alertHide)
            //     hideAlert.classList.add('buttonHide')
            //     hideAlert.style.width = '5%'
            //     hideAlert.style.height = '20px'
            //     hideAlert.textContent = "X"

            //     hideAlert.onclick = function () {
            //         severeWindDiv.style.display = 'none'

            //     }


    }

/***************************************************************
 WEATHER OUTLOOK ALERTS - LOW TEMPERATURE (currently unfinished)
***************************************************************/

   const minTempAlert = 10;
   let minTemp = data.min_temp

   if(minTempAlert <= minTemp){
    // creating a window for alert
       let severeLow = document.createElement('div');
       severeLow.classList.add('mintemp')
    //    severeLow.style.background = "blue";
       severeLow.style.width = "30%";
       severeLow.style.zIndex = '1';
    //    severeLow.style.borderRadius = "10px";
       severeLow.style.display = "flex";
       severeLow.style.flexDirection = "column";


   }

    if (data.pop >= 80 ){
        console.log("high change of rain in the weekend for. " + data.datetime)
    }
    // I have changed this because the data we get for rain is not usable i think will need a better api. Fir now its shows if pop is grater then 80 it will show it in the console with the date.


    /******************************************************************************************************************
     * Changing the colours of the text to correlate with the warnings - over 25 kts and temperatures below 0 degrees
     *****************************************************************************************************************/

    if(data.wind_spd > 25 || data.wind_gust_spd > 25){
        speeddiv.style.color = "red";
        gustdiv.style.color = "red";
        console.log("Wind gusts over 25 kts (equivalent conversions) may make it dangerous for certain boat ramps");
    }

    //set this to 10 for now
    if(data.max_temp < 10 || data.min_temp < 10)
    {
        // lowtempdiv.style.color = "blue";
        // hightempdiv.style.color - "blue";
    }


})).catch(err => console.error(err));


 //testing out a function that shows the Saturday and Saturday in console
 function testSaturday(date){
    let saturday = date.getDate() - (date.getDay() - 1) + 5;
    return new Date(date.setDate(saturday));
    
}
function testSunday(date){
    let sunday = date.getDate() - (date.getDay() -1) + 6;
    return new Date(date.setDate(sunday));
}
    dt = new Date(); 
    console.log(testSaturday(dt).toDateString().substring(0,11)); //outputs Sat Jun 18 
    console.log(testSunday(dt).toDateString().substring(0,11));  //outputs Sun Jun 19



function reformatDate(weatherBitDate) // ie "2022-06-14"
{
    let day = weatherBitDate.substring(8,10);
    let month = weatherBitDate.substring(5,7) - 1; // added the -1 since without its output was July
    let year = weatherBitDate.substring(0,4);
    date = new Date(year, month, day);
    return date.toDateString().substring(0,10);
}
   

    
//converting wind from metres per second to knots
function windConverter(mpstoKnots) {
mpstoKnots = parseFloat(mpstoKnots);
mpstoKnots = mpstoKnots * 1.94384;
    return mpstoKnots;
}


// return a formmatted string for temperature based on the currentTempUnit
function getTemperatureString(temperatureObject)
{
    return (currentTempUnit == "celsius") ? `${roundToOrLess(temperatureObject.celsius, 2)}  °C` : `${roundToOrLess(temperatureObject.fahrenheit, 2)} °F`;
}

// return a formmatted string for temperature based on the currentWindUnit
function getWindString(windObject)
{
    let windString;

    switch(currentWindUnit)
    {
        case "mps":
            windString = `${roundToOrLess(windObject.mps, 2)} mps`;
            break;
        case "kmph":
            windString = `${roundToOrLess(windObject.kmph, 2)} kmph`;
            break;
        case "knot":
            windString = `${roundToOrLess(windObject.knot, 2)} knots`;
            break;
    }   

    return windString;
}

// Update the values in a class with the current unit
function changeToCurrentUnit(className, weatherArray, stringFunction)
{
    document.querySelectorAll(className).forEach((temp,i) => 
    {
        if(temp != null)
        {
            temp.innerHTML = stringFunction(weatherArray[i]);
        }
    });
}
    
