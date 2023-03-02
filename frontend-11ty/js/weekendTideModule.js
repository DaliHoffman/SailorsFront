const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//const body = document.querySelector("body");

// build simple HTML elements to display a tidechart
function buildTideModule(location, requestedDays)
{
    let body = document.querySelector("body");
    
    let tideModule = document.createElement("div");
    tideModule.classList.add("tide_module");

    let locationHeading = document.createElement("h1");
    let locationSpan = document.createElement("span");
    locationHeading.innerText = "Tide Charts";
    locationHeading.append(locationSpan);

    tideModule.append(locationHeading);

    let chartContainer = document.createElement("div");
    chartContainer.classList.add("chart_container");

    requestedDays.forEach(day => 
    {
        console.log(buildNIWA_URL(NIWA_PATHS.chart_png, location, 1, formatDate(nextDay(day))));
        let dayHeading = document.createElement("h2");
        dayHeading.innerText = dayNames[day];
        let chartDiv = buildChartDiv(buildNIWA_URL(NIWA_PATHS.chart_png, location, 1, formatDate(nextDay(day))));
        chartDiv.prepend(dayHeading);
        chartContainer.append(chartDiv);
    });

    tideModule.append(chartContainer);
    body.append(tideModule);

    //Changes the first chart to be shown as "Today" instead of the day of the week,
    //as it will always be todays chart first (From : Error checking on chart build)
    let chartCon = document.querySelector(".chart_container") //All Charts
    let todayChart = chartCon.firstChild //First Chart
    let today = new Date() //Used to check which chart needs to have a border
    switch (today.getDay()){
        case 0:
            todayChart = todayChart.nextSibling //Change the Sunday border while keeping the Saturday data untouched
            todayChart.style.border = "3px solid"
            break
        
        default:
            todayChart.style.border = "3px solid"
            break
    }
}

function nextDay(x){
    var now = new Date();    
    now.setDate(now.getDate() + (x+(7-now.getDay())) % 7);
    return now;
}

function buildChartDiv(URL)
{
    let chartDiv = document.createElement("div");
    chartDiv.classList.add("chart_div");

    let chartImage = document.createElement("img");
    chartImage.src = URL;

    chartDiv.append(chartImage);

    return chartDiv;
}

//Will create 2 charts if today is Sat/Sun or 3 charts if any other day
//Todays chart will be shown first
let createCharts = () => {
    //Get the current day of the week (0 -> 6)
    let today = new Date()
    let chartDays = []
    today = today.getDay()

    //Removes duplicate charts if today is Saturday(6)/Sunday(0)
    today == 6 || today == 0 ? chartDays = [6, 0] : chartDays = [today, 6, 0]


    //Creates the charts from the specified days of the week
    buildTideModule(currentLocation, chartDays);
}
createCharts()

// display the tide chart for every location
//locations.forEach(location => buildChartDiv(location, buildNIWA_URL(NIWA_PATHS.chart_png, location, 7)));

// fetch(buildNIWA_URL(NIWA_PATHS.data, portChalmers, 31, "2022-06-11")).then(response => response.json()).then(data =>
//     {
//     let tideInfo = data.values;
//     // filter out times not in sunlight hours
//     tideInfo = tideInfo.filter(t => t.time.substring(11,13) >= 6 && t.time.substring(11,13) <= 18);
//     // create new array of objects containing tide info for one day
//     let days = [];
//     let index = 1;
//     while(tideInfo.length > 1)
//     {
//     if (tideInfo[0].time.substring(0,10) == tideInfo[index].time.substring(0,10))
//     {
//     index++;
//     }
//     else
//     {
//     days.push(tideInfo.splice(0, index));
//     index = 0;
//     }
//     }
//     days = days.concat(tideInfo);
//     console.log(days);
//     });