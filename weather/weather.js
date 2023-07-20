const APIKEY = "c7f30984e0c270923cbf89c58ce5e2d0";
let x;
let y;
let lat = 20;
let lon = 20;
console.log("weathermap.js");
function maplocation(event) {
    var width = window.innerWidth;
    var height = window.innerHeight;
    let Xoffset = document.getElementById("globe").x;
    let x = 180+event.pageX;
    if (x > 360) {
        x = x - 360;
    }
    console.log(width);
    document.getElementById("x").innerHTML = x;
    console.log(`x = ${x}`);
    let Yoffset = document.getElementById("globe").y;
    let y = 61+event.pageY-height+340;
    document.getElementById("y").innerHTML = y;
    console.log(`y = ${y}`);
    let lon = x;
    let lat = y;
}


const UNITS = "imperial";
const COUNT = 16
//const WEATHERURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&cnt=${COUNT}&units=${UNITS}&appid=$APIKEY`;
console.log("weather.js");
function loadWeather(lon, lat) {
    console.log(lon)
    console.log(lat)
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
    let WEATHERURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&cnt=${COUNT}&units=${UNITS}&appid=${APIKEY}`;
    xhttp.open("GET", WEATHERURL, true);
    xhttp.send();    
}


function displayWeather(json) {
    document.getElementById("location").innerHTML = `${json.name}, ${json.sys.country}`;
    document.getElementById("condition").innerHTML = json.weather[0].main;
    document.getElementById("temp").innerHTML = json.main.temp;
    document.getElementById("feelslike").innerHTML = json.main.feels_like;
    document.getElementById("tempmin").innerHTML = json.main.temp_min;
    document.getElementById("tempmax").innerHTML = json.main.temp_max;
    document.getElementById("x").innerHTML = x;
    
}