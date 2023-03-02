// // fetching data from new api with all info about the boat ramps 
// uses async will display a message while the api cold starts.
(async () => {
    const res = await fetch(`https://bitpurplemonkey.herokuapp.com/api/v1/boatramps`);
    const json = await res.json();
    let boatsData = json['data'];
    boatsData.sort(); 

    boatsData.forEach(boatlist => {      
        // console.log(boatlist)

        // giving data a var so you can use it with out writing it out all the time.
        let inFoRampInfo = boatlist.informations[0].information;
        let latInfo = boatlist.latitude;
        let longInfo = boatlist.longitude;
        let dockName = (boatlist.name);
        let amenities= (boatlist.informations[0].amenities);
      console.log(amenities)
        // used to display all the infomation 
        let div = document.createElement("div")
        div.setAttribute('class', 'ramp_item')
        div.style.display="flex";
        div.innerHTML =  dockName + "<br />"
        + "City: " +boatlist.city+  "<br />"
        + "LAT: "  + latInfo + "<br />"
        + "LONG: " + longInfo + "<br />"
        + "Status: " + inFoRampInfo + '<br />'
        + "Amenities: " + amenities;
        
        //MAP LINKS
        //Add the location link to the div
        let pageLink = document.createElement("a");    
        pageLink.setAttribute('class', 'ffff')                                //Create the clickable link
        let boatLocation = `http://www.google.com/maps/place/${latInfo},${longInfo}`; //Get the location from the API
        pageLink.href = boatLocation;   //Link text to the page
        pageLink.innerHTML = "Map "    //Name on the page
        pageLink.style.paddingRight = "10px" //Spacing so that the Title is still easily read
        pageLink.target = "_blank"          //Open the map in a new tab
        pageLink.style.height = "10%"      //Used to make only the text clickable (Otherwise full height of boatramp info)
        // pageLink.style.color = "grey"
        div.prepend(pageLink)             //Add the map link before the title (Breaks responsiveness if 'appended' and is hard to read)

        document.querySelector(".boat_ramp").append(div);
        //sets all text to bold
        div.style.fontWeight=("bold")
        // hides loading 
        loadingData.style.display='none';
        boatWait2.style.display='none';
    })   
    
  })();
//   used for spining loading
  let loadingData = document.createElement("div")
  loadingData.setAttribute('class', 'loader')
  document.querySelector(".loaderPlacehold").append(loadingData);

  //   used to show the message on screen it will be hidden when other code runs.
  let boatWait2 = document.createElement("p")
  document.querySelector(".loaderPlacehold").append(boatWait2)
  boatWait2.setAttribute('class', 'loadAlert')
  boatWait2.style.fontWeight = "bold";
  boatWait2.style.fontSize = "24px";
  boatWait2.textContent="Please wait while the data is fetched... "

