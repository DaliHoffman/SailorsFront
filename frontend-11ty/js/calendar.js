document.querySelector("#calendarHeading").innerText += ` ${currentLocation.name}`;

/* Function to convert the timezones of NIWA data which is in UTC */

function toISOStringWithTimeZone (date){
    const tzOffset = -date.getTimezoneOffset();
    const diff = tzOffset >= 0 ? '+' : '-';
    const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
    return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    diff + pad(tzOffset / 60) +
    ':' + pad(tzOffset % 60);
}


/* TIDE CALENDAR FUNCTION */
function tide_Calendar()
{

    /* MONTH HEADING */

    let monthHeading = document.createElement("div");
    let today = new Date();
    console.log(today);
    const month_name = today.toLocaleDateString('default', {month: 'long'});
    const year_name = today.getFullYear();
    monthHeading.innerHTML = month_name + " " + year_name;
    monthHeading.classList.add("month_heading");

    let day = today.getDate();


    /****HEADING CONTAINER WITH THE SMTWTFS FORMAT ON TOP OF THE DATA ****/

    let headingContainer = document.createElement("div");
    headingContainer.classList.add("heading_container");

    // headings for each day
    let sundayHeading = document.createElement("div");
    sundayHeading.classList.add("sunday_heading");
    sundayHeading.innerHTML = "S";

    let mondayHeading = document.createElement("div");
    mondayHeading.classList.add("monday_heading");
    mondayHeading.innerHTML = "M";

    let tuesdayHeading = document.createElement("div");
    tuesdayHeading.classList.add("tuesday_heading");
    tuesdayHeading.innerHTML = "T";

    let wednesdayHeading = document.createElement("div");
    wednesdayHeading.classList.add("wednesday_heading");
    wednesdayHeading.innerHTML = "W";

    let thursdayHeading = document.createElement("div");
    thursdayHeading.classList.add("thursday_heading");
    thursdayHeading.innerHTML = "T";

    let fridayHeading = document.createElement("div");
    fridayHeading.classList.add("friday_heading");
    fridayHeading.innerHTML = "F";

    let saturdayHeading = document.createElement("div");
    saturdayHeading.classList.add("saturday_heading");
    saturdayHeading.innerHTML = "S";

    //calendar container
    let cal_container = document.createElement("ul");
    cal_container.classList.add("calendar_parent");

    //appending all headings to HTML
    document.querySelector("body").append(monthHeading, headingContainer, cal_container);
    headingContainer.append(sundayHeading, mondayHeading, tuesdayHeading, wednesdayHeading, thursdayHeading, fridayHeading, saturdayHeading);


    fetch(buildNIWA_URL(NIWA_PATHS.data, currentLocation, 31)).then(response => response.json()).then(data =>
        {
            let tideInfo = data.values;
            console.log(data);
            console.log(tideInfo);
            
            // calling time zone function to use  with the NIWA data
            tideInfo.map(function (ele) {
                ele.time = toISOStringWithTimeZone(new Date (ele.time));
            });

            /*FILTER OUT TIMES IN SUNLIGHT HOURS - 
            edited to include all the right data from each day and times from 6am to 6pm */
            tideInfo = tideInfo.filter(t => t.time.substring(11,13) >= (localStorage.timeAM) && t.time.substring(11,13) < (localStorage.timePM));

            // create new array of objects containing tide info for one day
            let days = [];
            let index = 1;

            /* SORTING THE DAYLIGHT HOURS INTO EACH DAY */
            while(tideInfo.length > 1)
            {

                if (tideInfo[index] != null && tideInfo[0].time.substring(0,10) == tideInfo[index].time.substring(0,10))
                {
                    index++;
                }
                else
                {
                    days.push(tideInfo.splice(0,index));
                    index = 0;
                }
            }
            
            if(tideInfo.length > 0)
            {
                days = days.concat([[tideInfo[0]]])
            }


            /* TIDE ICONS */
            let tideIcon1 = 'fa-solid';
            let tideIcon2;
            let tideIcon = (t) => 
            {
                if(t>0 && t<=0.8)
                {
                    tideIcon2 = "fa-angles-down" ;
                }
                else
                {
                    tideIcon2 = "fa-angles-up";
                }
            }


            /* OUTPUTTING THE DATA ON THE WEBPAGE */
            days.forEach(day =>
            {

                /**** OUTPUTTING THE FULL DATES OF NIWA DATA AND DISPLAYING TIMEZONE ISSUE ****/
                let todaysDate = new Date(day[0].time);
                todaysDate.toLocaleString('en-NZ' , {timeZone: 'Pacific/Auckland'})
                let timeDiff = todaysDate.getTimezoneOffset();
                console.log(todaysDate);
                console.log(timeDiff); // returns a value of -720 which means the difference is 12 hours ahead of UTC time 

                //times in niwa data is in UTC +0 = "2022-08-28T16:13:00Z"


                let dayLi = document.createElement("li");
                dayLi.classList.add("day_container");
                cal_container.classList.add("calendar_child");

                
                let dateHeading = document.createElement("h1");
                dateHeading.classList.add("h1_dateHeading");
                dateHeading.innerHTML = day[0].time.substring(8,10); // substring (5,10) to include month
                dayLi.append(dateHeading);



                /**** SORT THE DAYS FROM NIWA DATA FROM SUNDAY TO SATURDAY TO MATCH EACH DAY HEADING ****/
                
                let dayOfWeekName = todaysDate.toLocaleString('default', {weekday: 'long'});
                console.log(dayOfWeekName);
                //console.log(dayOfWeekName == "Wednesday");



                /**** MATCHING EACH DAY of NIWA DATA WITH GRID STYLING ****/
                switch(dayOfWeekName)
                {
                    case "Sunday":
                        dayLi.style.gridColumnStart = "1";
                        break;
                    case "Monday":
                        dayLi.style.gridColumnStart = "2";
                        break;
                    case "Tuesday":
                        dayLi.style.gridColumnStart = "3";
                        break;
                    case "Wednesday":
                        dayLi.style.gridColumnStart = "4";
                        break;
                    case "Thursday":
                        dayLi.style.gridColumnStart = "5";
                        break;
                    case "Friday":
                        dayLi.style.gridColumnStart = "6";
                        break;
                    case "Saturday":
                        dayLi.style.gridColumnStart = "7";
                        break;

                }

                /*TIMES OF THE TIDE AND TIDE HEIGHT*/
                    day.forEach(time =>
                    {

                        let dateTime = new Date(time.time);
                        console.log(time);

                        let timeHeading = document.createElement("div");
                        let tide = time.value;
                        
                        //console.log(tide)
                        tideIcon(tide)
                        let icon = document.createElement("i");
                        icon.classList.add(tideIcon1, tideIcon2);
                        timeHeading.classList.add("tide_data_time");
                        /*I used en-GB in locale time string to convert to 24 hour time as without it 
                        it shows the times in AM and PM, also without substrings it breaks the responsiveness set in calendar
                        */
                        timeHeading.innerHTML= dateTime.toLocaleTimeString('en-GB').substring(0,5) 
                        + " " + tide + "M";
                        timeHeading.append(icon);
                        dayLi.append(timeHeading);

                        //changing colour of data set in september
                        if(day[0].time.substring(5,7) == "09")
                        {
                            //monthHeading.innerHTML = "September 2022";
                            timeHeading.style.backgroundColor = "darkgray";
                        }
                    });

                    // consoling out the month, August returning false and September returning true

                    //console.log(day[0].time.substring(5,7) == "09"); 

                    // consoling out the date to figure out which dates fit into which day

                    //console.log(day[0].time.substring(5,10) == "08-25");

                cal_container.append(dayLi);
                
            

            });
        });
        
}

tide_Calendar(currentLocation);