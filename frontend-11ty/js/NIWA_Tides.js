// Query parameters: path + lat + long + numberOfDays (default: 7) + startdate (default: today, format: yyy-mm-dd) + datum (default: LAT) + NIWA key
// Note: NIWA key will not work for serving locally with 11ty. Omit NIWA key from queries if serving locally.
// Please see locations.js for the available locations 

const NIWA_URL = "https://api.niwa.co.nz/tides/"
const NIWA_KEY = "&apikey=F8g5zg4vEey0dOJriP6XxU5o1RVbgeW3";
const NIWA_PATHS = {
    chart_png: "chart.png?",
    chart_svg: "chart.svg?",
    data: "data?",
    data_csv: "data.csv?" 
};

// format a date for the NIWA Tides API. returns the current date by default
function formatDate(myDate = new Date(Date.now()))
{
    let month = (myDate.getMonth() + 1).toString();
    let date = (myDate.getDate()).toString();
    if (month.length <= 1)
    {
        month = "0" + month;
    }
    if (date.length <= 1)
    {
        date = "0" + date;
    }
    let formattedDate = `${myDate.getFullYear()}-${month}-${date}`
    return formattedDate;
}

// interpolate the desired path and necessary parameters into a string to be used as an URL query
function buildNIWA_URL(path = NIWA_PATHS.data, locationObject = locations[0], days = 1, startdate = formatDate(), datum = "LAT", interval = null)
{
    let lat = locationObject.NZGD1949.latitude;
    let long = locationObject.NZGD1949.longitude;
    let urlQuery = `${NIWA_URL}${path}lat=${lat}&long=${long}&numberOfDays=${days}&startDate=${startdate}&datum=${datum}`;
    if (interval != null && (path === NIWA_PATHS.data || path === NIWA_PATHS.data_csv))
    {
        urlQuery += `&interval=${interval}`;
    }
    //To make Localhost work//
    urlQuery += NIWA_KEY;
    //Comment out the above Line//
    return urlQuery;
}
