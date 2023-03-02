/**
 * Will create all local storage values for the grid/tide charts if they dont already exist.
 * This check will occur every page load so that data is shown accurately and not as "undefined".
 * If the localStorage has a value, that value is kept, otherwise a default value is set.
 */
!localStorage.currentTempUnit ? localStorage.setItem("currentTempUnit", "celsius") : localStorage.currentTempUnit;
!localStorage.currentWindUnit ? localStorage.setItem("currentWindUnit", "mps") : localStorage.currentWindUnit;
!localStorage.timeAM ? localStorage.setItem("timeAM", 0) : localStorage.timeAM;
!localStorage.timePM ? localStorage.setItem("timePM", 24) : localStorage.timePM;