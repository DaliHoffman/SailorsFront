// // fetching data from new api with all info about the boat ramps
// uses async will display a message while the api cold starts.

const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

const user = urlParams.get("user");
console.log(user);
//console.log('https://bitpurplemonkey.herokuapp.com/api/v1/users/'+user);

(async () => {
  const res = await fetch(
    "https://bitpurplemonkey.herokuapp.com/api/v1/users/" + user
  );
  const json = await res.json();
  console.log(json);
  let usersData = json["data"];

  let down = document.getElementById("userForm");
  let br = document.createElement("br");

  var form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("action", "submit.php");

  // Create an input element for Full Name
  var FN = document.createElement("input");
  FN.setAttribute("type", "text");
  FN.setAttribute("name", "Name");
  FN.setAttribute("value", usersData.name)
  FN.setAttribute("placeholder", "Name");

  // Create an input element for emailID
  var EID = document.createElement("input");
  EID.setAttribute("type", "text");
  EID.setAttribute("name", "email");
  EID.setAttribute("value", usersData.email)
  EID.setAttribute("placeholder", "E-Mail");

    // Create an input element for emailID
    var Role = document.createElement("input");
    Role.setAttribute("type", "text");
    Role.setAttribute("name", "role");
    Role.setAttribute("value", usersData.role)
    Role.setAttribute("placeholder", "Role");

  // create a submit button
  var s = document.createElement("input");
  s.setAttribute("type", "submit");
  s.setAttribute("value", "Submit");

  // Append the full name input to the form
  form.appendChild(FN);

  // Inserting a line break
  form.appendChild(br.cloneNode());

  // Append the emailID to the form
  form.appendChild(EID);
  form.appendChild(br.cloneNode());

  form.appendChild(Role);
  form.appendChild(br.cloneNode());

  // Append the submit button to the form
  form.appendChild(s);

  document.getElementsByTagName("body")[0].appendChild(form);
})();
