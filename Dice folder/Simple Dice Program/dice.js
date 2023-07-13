function roll(){
    const sides = 6;
    var randomNumber = Math.floor(Math.random() * sides) + 1;
    let face = document.getElementById("face");
    face.innerHTML = randomNumber;
}

var button = document.getElementById("button");
button.addEventListener("click", roll);