/* 
 * This script contains the coordinates for the locations requested by the client to be monitored.
 * Both WGS84 and NZGD1949 coordinates for the locations are included.
 * This is because the NIWA Tides API uses NZGD1949 and the OpenWeather API uses WGS84.
*/

// these are the locations requested by the client
let marina = buildLocationObject("Marina", buildLatLong(-45.87161, 170.52805), buildLatLong(-45.87323,170.52796));
let vauxhall = buildLocationObject("Vauxhall Yacht Club", buildLatLong(-45.88478, 170.52489), buildLatLong(-45.88640,170.52480));
let portChalmers = buildLocationObject("Port Chalmers", buildLatLong(-45.81590, 170.62135), buildLatLong(-45.81752,170.62126));
let broadBay = buildLocationObject("Broad Bay Boating", buildLatLong(-45.848117,170.620410), buildLatLong(-45.84974,170.62032));
let tairoaHead = buildLocationObject("Tairoa Head", buildLatLong(-45.77281,170.72846), buildLatLong(-45.77443,170.72837));

let locations = [marina, vauxhall, portChalmers, broadBay, tairoaHead];

let currentLocation = (localStorage.currentLocation == null) ? locations[0] : JSON.parse(localStorage.currentLocation);

// return an object containing latitude and longitude
function buildLatLong(lat, long)
{
    return {latitude: lat, longitude: long};
}

// return an object representing a place with both WGS84 and NZGD1949 coordinates
function buildLocationObject(locationName, latLong_WGS84, latLong_NZGD1949)
{
    let locationObject = {
        name: locationName,
        WGS84: latLong_WGS84,
        NZGD1949: latLong_NZGD1949
    };
    return locationObject;
}

// Example for Openweather request:
// fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${portChalmers.WGS84.latitude}&lon=${portChalmers.WGS84.longitude}&appid=a0734a6c8412a878935845b45f197bd6`)
// .then(response => response.json()).then(data => console.log(data));