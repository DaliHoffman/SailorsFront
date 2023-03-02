const radioButtons = document.querySelectorAll('input');
const currentGrid = document.querySelector(".current_weather");
let currentTempObjects = [];
let currentFeelLikeObjects = [];
let currentWindObjects = [];
let currentGustObjects = [];

//let weatherTitles = ["Temperature", "Feels like", "Wind Direction", "Wind Speed", "Wind Gust"];



/* using open weather map api because there is info on the locations 
and uses WGS84 co-ordinates as stated on locations.js file */
fetch("https://api.openweathermap.org/data/2.5/weather?lat=-45.874&lon=170.503&appid=4c6996bd70ed1f61d3f48a71f84c947d")
    .then(res => res.json())
    .then(d => {

        let i = 0;
        // console.log(d);

        //query selectors to append data into right part of the table
        let tempData = document.querySelector(".current_temp");
        let flData = document.querySelector(".current_fl");
        let wSpeedData = document.querySelector(".speedwind");
        let wDirData = document.querySelector(".dirwind");
        let wGustData = document.querySelector(".gustwind");



        let tempDiv = document.createElement("td");
        currentTempObjects.push(buildTemperatureObject(kelvinToCelsius(`${d.main.temp}`).toFixed(1)));
        // default temp unit is in kelvin with this api
        tempDiv.innerHTML = getTemperatureString(currentTempObjects[i]);
        // tempDiv.style.color = "blue"; // only works outside of if statement for some reason???
        tempDiv.classList.add("temp_data");
        tempData.append(tempDiv);

        let feelsLike = document.createElement("td");
        //feelsLike.innerHTML = kelvinToCelsius(`${d.main.feels_like}`).toFixed(1) + " °C"; 
        currentFeelLikeObjects.push(buildTemperatureObject(kelvinToCelsius(`${d.main.feels_like}`).toFixed(1)));
        feelsLike.innerHTML = getTemperatureString(currentFeelLikeObjects[i]);
        feelsLike.classList.add("feels_like");
        flData.append(feelsLike);

        //Low temp text, currently not working, also set it to 10 to try out
        if (tempDiv < 10 || feelsLike < 10) {
            // tempDiv.style.color = "blue";
            console.log("Temp below freezing")
        }

        let windDir = document.createElement("td");
        windDir.innerHTML = convertWindDir(`${d.wind.deg}`); // wind is in degrees by default, used a function to convert them (function in utilities.js)
        windDir.classList.add("wind_direction");
        wDirData.append(windDir);

        let windSpeed = document.createElement("td");
        currentWindObjects.push(buildWindObject(d.wind.speed)); // default unit in this api is m/s
        windSpeed.innerHTML = getWindString(currentWindObjects[i]);
        //windSpeed.innerHTML = mStoKms(`${d.wind.speed}`).toFixed(1) + " kmph"; 
        // windSpeed.style.color = "red";
        windSpeed.classList.add("currentwind_speed");
        wSpeedData.append(windSpeed);

        let windGust = document.createElement("td");
        currentGustObjects.push(buildWindObject(d.wind.gust));
        windGust.innerHTML = getWindString(currentGustObjects[i]);
        //windGust.innerHTML = mStoKms(`${d.wind.gust}`).toFixed(1) + " kmph"; 
        windGust.classList.add("currentwind_gust");
        wGustData.append(windGust);
        // used for windalert 
        getWindAlert(currentGustObjects[i])

        // Wind speed text, currently not working in if statement
        if (windSpeed > 25 || windGust > 25) {
            windSpeed.style.color = "red";
            windGust.style.color = "red";
            console.log("Wind gusts over 25 kts (equivalent conversions) may make it dangerous for certain boat ramps");
        }


        console.log(d.wind.deg); // putting the wind degrees in console to make sure function is working properly
        console.log(d.main.temp); // temperature in kelvin
        console.log(d.main.feels_like); // feels like temperature in Kelvin




        // converting data based on what buttons user clicks

        // radioButtons.addEventListener('click', event => {
        //     if (celsius.checked) {
        //         tempDiv.innerHTML = d.main.temp + " °C";
        //         feelsLike.innerHTML = d.main.feels_like + " °C"; 
        //         }
        //     if (fahrenheit.checked) {
        //         tempDiv.innerHTML = celsiusToFah(d.main.temp) + " °F";
        //         feelsLike.innerHTML = celsiusToFah(d.main.feels_like) + " °F";
        //     }
        //     if (kilometers.checked) {
        //         windGust.innerHTML = mStoKms(d.wind.gust).toFixed(1) + " kmph";
        //         windSpeed.innerHTML = mStoKms(d.wind.speed).toFixed(1) + " kmph"; 
        //         }
        //     if (meters.checked) {
        //         windGust.innerHTML = d.wind.gust + "m/s";
        //         windSpeed.innerHTML = d.wind.speed + " m/s"; 
        //     } 
        //     if (knots.checked)  {
        //         windGust.innerHTML = mpsToKnots(d.wind.gust) + "knots";
        //         windGust.innerHTML = mpsToKnots(d.wind.speed) + "knots";  
        //     }
        // });


        // console.log("wind speed "+ d.wind.speed)
        // console.log("wind deg   "+ d.wind.deg)
        // console.log("wind gust  "+ d.wind.gust)


        // changed from weekend grid to stop alert showing twice
        function getWindAlert(windObject) {
            let windString;

            switch (currentWindUnit) {
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

            /**********************************************
             * SEVERE WEATHER ALERT FOR CURRENT WEATHER 
             *********************************************/

            // this is used for if we need to use the same wind speed.   
            // from google the danger speeds that can cause a capsize is around 34 knots or 62.96 kph or 17.48 m/s

            //from product owner the warnings should appear when it gets above 25 knots

            const windSpeedAlert = 62.96;
            let windAlertSpeed = d.wind.speed
            let windAlertGust = d.wind.gust
            console.log("ffff"  + d.wind.gust)

            //using the warnings div created in html to put alerts on top
            let warnings = document.querySelector(".warnings");


            // this is used to display wind for gust and speed 
            if (windAlertSpeed >= windSpeedAlert  || windAlertGust >= windSpeedAlert) {
                // creating the div and appending the info 
                var severeWeatherDiv = document.createElement('div');
                severeWeatherDiv.classList.add('severeWeather')
                severeWeatherDiv.style.background = "red";
                severeWeatherDiv.style.width = "30%";
                severeWeatherDiv.style.zIndex = '1';
                // severeWeatherDiv.style.borderRadius = "10px";
                severeWeatherDiv.style.display = "flex";
                severeWeatherDiv.style.flexDirection = "column";

                // severeWeatherDiv.style.marginLeft = "320px";
                // severeWeatherDiv.style.marginBottom = "20px";

                warnings.append(severeWeatherDiv);
                // ternary statement used to make div more mobile useful as all elements are made in js
                window.innerWidth < 415 ?
                    (severeWeatherDiv.style.width = "414px") :
                    (severeWeatherDiv.style.backgroundColor = "red");
                // header 
                let alertMessageHeader = document.createElement("p")
                alertMessageHeader.innerHTML = "Severe wind warning";
                document.querySelector(".severeWeather").append(alertMessageHeader)
                alertMessageHeader.style.textAlign = "center";
                alertMessageHeader.style.fontWeight = "bold";
                alertMessageHeader.style.fontSize = "24px";
                // first alert 
                let alertMessage = document.createElement("p")
                alertMessage.innerHTML = " The current wind speed today is high " + windString;
                document.querySelector(".severeWeather").append(alertMessage)
                alertMessage.style.textAlign = "center";
                alertMessage.style.fontWeight = "bold";

                let alertHide = document.createElement("button")
                document.querySelector(".severeWeather").append(alertHide)
                alertHide.classList.add('buttonHide')
                // button style
                alertHide.style.width = '5%'
                alertHide.style.height = '20px'
                alertHide.textContent = "X"
                // function for button click
                alertHide.onclick = function () {
                    severeWeatherDiv.style.display = 'none'

                }

            }
            return windString;
        }

        // temperature alert for when temp goes below freezing, not showing, set to 10 for testing
        // temp value return in kelvin 

        const lowTempAlert = 0;
        let lowTemp = d.main.temp
        console.log("weather " + lowTemp)

        if(lowTemp <= lowTempAlert)
        {
            let severeTemp = document.createElement('div');
                severeTemp.classList.add('lowtemp')
                // severeTemp.style.background = "blue";
                severeTemp.style.width = "30%";
                severeTemp.style.zIndex = '1';
                severeTemp.style.borderRadius = "10px";
                severeTemp.style.display = "flex";
                severeTemp.style.flexDirection = "column";

                document.querySelector(".warnings").append(severeTemp);

                // heading
                let tempAlertHeader = document.createElement("p")
                tempAlertHeader.innerHTML = "Low Temperature";
                tempAlertHeader.style.textAlign = "center";
                tempAlertHeader.style.fontWeight = "bold";
                tempAlertHeader.style.fontSize = "24px";
                severeTemp.append(tempAlertHeader)

                //alert message
                let tempMessage = document.createElement("p")

                
                tempMessage.innerHTML = " The current temperature is " + lowTemp + " kelvin"; //can't find temperature string
                tempMessage.style.textAlign = "center";
                tempMessage.style.fontWeight = "bold";
                severeTemp.append(tempMessage)

                let tempHide = document.createElement("button")
                severeTemp.append(tempHide)
                tempHide.classList.add('buttonHide')
                // button style
                tempHide.style.width = '5%'
                tempHide.style.height = '20px'
                tempHide.textContent = "X"
                // function for button click
                tempHide.onclick = function () {
                    severeTemp.style.display = 'none'
                    
                }
        }

        
    });




function changeToCurrentUnit(className, weatherArray, stringFunction) {
    document.querySelectorAll(className).forEach((temp, i) => {
        if (temp != null) {
            temp.innerHTML = stringFunction(weatherArray[i]);
        }
    });
}


