

console.log("weathermap.js");
function maplocation(event) {
    var width = window.innerWidth;
    var height = window.innerHeight;
    let Xoffset = document.getElementById("globe").x;
    let x = event.pageX-180;
   // console.log(width);
    document.getElementById("x").innerHTML = x;
  //  console.log(`x = ${x}`);
    let Yoffset = document.getElementById("globe").y;
    //console.log(Yoffset);
    let y = -1*((event.pageY)-Yoffset-90);
    document.getElementById("y").innerHTML = y;
    console.log(`y = ${y}`);
    let lon = x;
    let lat = y;
    console.log(lon)
    console.log(lat)
    loadWeather(lon, lat);
}
