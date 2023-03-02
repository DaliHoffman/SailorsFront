function dropFunction(){
    document.getElementById("Dropdown").classList.toggle("show");
}

// window.onclick = function(event){
//   if (!event.target.matches('.locationSet'))
//   {
//   document.querySelector(".dropdown-content").classList.remove('show');
//   }
//   }

locations.forEach(location =>
  {
  let locationLink = document.createElement("a");
  locationLink.href = "#" + location.name.split(" ").join("");
  locationLink.innerHTML = location.name;
  locationLink.onclick = _ =>
  {
  document.querySelector("#select").innerHTML = location.name;
  localStorage.setItem("currentLocation", JSON.stringify(location));
  window.location.reload();
  }
  document.querySelector("#Dropdown").append(locationLink);
  });

  