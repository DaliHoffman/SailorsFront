/**********************************************\
 
 Settings Menu
 -------------
 Acts as a buffer for the radio buttons, 
 storing the value and waiting for a click 
 event on the apply button to set the units
 within the dashboard grid.   
 
\**********************************************/

/*
For updating temperature and wind units with apply button
*/
let applyButton = document.querySelector(".applyButton") //Select the button in settings menu
let tempToChange = localStorage.currentTempUnit //Set to current stored units to show on page reload
let windToChange = localStorage.currentWindUnit
let currentTempDisplay = document.querySelector(".currentTempDisplay") //Display to user of current unit used in grid
let currentWindDisplay = document.querySelector(".currentWindDisplay")
currentTempDisplay.innerHTML = `Currently Applied Temp Unit: ${tempToChange}` //Update the user display with the correct unit
currentWindDisplay.innerHTML = `Currently Applied Wind Unit: ${windToChange}`

//Pass in which unit is being set and what it is changing to
//Checks the unit type (temp, wind) and updates the relevant value
setApplyUnit = (unitToSet, changeUnit) => {
    switch(unitToSet){
        case "currentTempUnit": tempToChange = changeUnit; break;
        case "currentWindUnit": windToChange = changeUnit; break;
        default: break;
    }
}

//Checks and shows the correct radio button selected on page load
document.querySelectorAll("input").forEach(r =>
    {
      if (r.id === currentTempUnit){
        r.checked = true;
      }
      else if (r.id === currentWindUnit)
      {
        r.checked = true;
      }
})

/*
For the apply button when clicked
*/
//If the button is clicked, change the temp/wind units
applyButton.addEventListener("click", e => {
  applyButton.innerHTML = "Settings Applied" //Changes the text when clicked
  applyButton.style.color = "#7FFF00" //Shows as green to indicate successful application of settings
  applyButton.style.backgroundColor = "grey"
  setTimeout('applyButton.innerHTML = "Apply Changes"', 2000) //Changes back to normal text after 2 seconds
  setTimeout('applyButton.style.color = ""', 2000) //Using "" returns the style to its original value
  setTimeout('applyButton.style.backgroundColor = ""', 2000)
  
  //Update the times from the dropdowns and reload
  setTideTime()

  //Update and display the units currently applied
  localStorage.currentTempUnit = tempToChange
  localStorage.currentWindUnit = windToChange
  currentTempDisplay.innerHTML = `Currently Applied Temp Unit: ${localStorage.currentTempUnit}`
  currentWindDisplay.innerHTML = `Currently Applied Wind Unit: ${localStorage.currentWindUnit}`

  //Update the grids with the new units
  setCurrentUnit('currentTempUnit', tempToChange)
  setCurrentUnit('currentWindUnit', windToChange)
})

/***********************************\
Tide Selection
--------------
For the tide time selection
called above in the apply button.

Allows the user to choose a min/max
time for the tide calendar
\***********************************/
let calendar = document.querySelectorAll(".calendar_parent")//Select the calendar to update
let timeAM = document.querySelector(".timeAM")//Select box with AM times
let timePM = document.querySelector(".timePM")

//Checks the current values in selection boxes and updates local storage
let setTideTime = () => {
  localStorage.timeAM = ("0" + getTideTime("AM")).slice(-2)//Ensures numbers have 2 digits for API format (eg 01:00:00AM)
  if (localStorage.timeAM < 0){
    localStorage.timeAM = 0; //Defaults to min time range if no time has been selected
  }
  localStorage.timePM = getTideTime("PM")
  if (localStorage.timePM <= 11){
    localStorage.timePM = 24; //Defaults to max time range if no time has been selected
  }
}

/*Pass in AM or PM and returns the value 
from the relevant dropdown in settings menu */
let getTideTime = (timeOfDay) =>{
  let hour = 0;
  switch(timeOfDay){
      //Get selected item from dropdown currently, make sure it is INT for return
      case "AM": hour = parseInt(timeAM.options[timeAM.selectedIndex].value); break 
      case "PM": hour = parseInt(timePM.options[timePM.selectedIndex].value) + 12; break
      default:
        break
  }
  return hour -1; //-1 due to title in select box being the first item
}

//Removes the existing calendar/values and creates a new calendar
let reloadCalendar = () => {
  //tide_Calendar()
}

//Called to initially setup the tide calendar values
setTideTime()
