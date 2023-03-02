// // fetching data from new api with all info about the boat ramps
// uses async will display a message while the api cold starts.
(async () => {
  const res = await fetch(`https://bitpurplemonkey.herokuapp.com/api/v1/users`);
  const json = await res.json();
  let usersData = json["data"];
  usersData.sort();

  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");

  table.appendChild(thead);
  table.appendChild(tbody);
  table.classList.add("admin");

  let row_1 = document.createElement("tr");
  let heading_1 = document.createElement("th");
  heading_1.innerHTML = "Name";
  let heading_2 = document.createElement("th");
  heading_2.innerHTML = "Email";
  let heading_3 = document.createElement("th");
  heading_3.innerHTML = "Role";
  let heading_4 = document.createElement("th");
  heading_4.innerHTML = "Function";
  row_1.appendChild(heading_1);
  row_1.appendChild(heading_2);
  row_1.appendChild(heading_3);
  // Commented out the Update feature until it has been finished
  // row_1.appendChild(heading_4);
  thead.appendChild(row_1);

  usersData.forEach((userlist) => {
    // console.log(userlist)

    // giving data a var so you can use it with out writing it out all the time.
    let usersName = userlist.name;

    let row = document.createElement("tr");
    let row_data_1 = document.createElement("td");
    row_data_1.innerHTML = usersName;
    let row_data_2 = document.createElement("td");
    row_data_2.innerHTML = userlist.email;
    let row_data_3 = document.createElement("td");
    row_data_3.innerHTML = userlist.role;
    let row_data_4 = document.createElement("td");
    row_data_4.innerHTML =
      '<a href = "/edituser?user=' + userlist.id + '"/>Update</a>';

    row.appendChild(row_data_1);
    row.appendChild(row_data_2);
    row.appendChild(row_data_3);
    // Commented out the Update feature until it has been finished
    // row.appendChild(row_data_4);
    tbody.appendChild(row);

    document.querySelector(".user_list").append(table);
    //sets all text to bold
    thead.style.fontWeight = "bold";
    // hides loading
    loadingData.style.display = "none";
    loadWait.style.display = "none";
  });
})();
//   used for spining loading
let loadingData = document.createElement("div");
loadingData.setAttribute("class", "loader");
document.querySelector(".loaderPlacehold").append(loadingData);

//   used to show the message on screen it will be hidden when other code runs.
let loadWait = document.createElement("p");
document.querySelector(".loaderPlacehold").append(loadWait);
loadWait.setAttribute("class", "loadAlert");
loadWait.style.fontWeight = "bold";
loadWait.style.fontSize = "24px";
loadWait.textContent = "Please wait while the data is fetched... ";
