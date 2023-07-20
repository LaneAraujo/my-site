const APIKEY = "c7f30984e0c270923cbf89c58ce5e2d0";
const UNITS = "imperial";
const COUNT = 16
const WEATHERURL = `https://api.openweathermap.org/data/2.5/
weather?lat=${lat}&lon=${lon}&cnt=${COUNT}&units=${UNITS}&appid=${APIKEY}`;

function loadWeather() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (this.status != 200) {
            alert(`Payload bad (code ${this.status})`);
            return;
        }
        document.getElementById("jsontext").innerHTML = this.responseText;
        displayWeather(JSON.parse(this.responseText));
    }
    xhttp.open("GET", WEATHERURL, true);
    xhttp.send();    
}


function displayWeather(json) {
    document.getElementById("location").innerHTML = `${json.name}, ${json.sys.country}`;
    document.getElementById("condition").innerHTML = json.weather[0].main;
}