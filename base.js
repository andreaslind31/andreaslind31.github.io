"use strict";

let currentAddress = window.location.href;
console.log(currentAddress);

let currentURL = new URL(window.location.href);
console.log(currentURL);
console.log(currentURL.search);

let searchParams = new URLSearchParams(currentURL.search);

let fname = searchParams.get("fname");
let age = searchParams.get("age");
let mail = searchParams.get("mail");
let date = searchParams.get("date");
let innebandy = searchParams.get("sport3");
let ejSportFreak = searchParams.get("sport5");
// let checkbox = searchParams.get("checkbox");

console.log("Name: ", fname);
console.log("Age: ", age);
console.log("Mail: ", mail);
console.log("Date: ", date);
console.log("Floorball-geek?", innebandy);
console.log("General sports interest? ", ejSportFreak);

function showMessage(message) {
    document.getElementById("input").textContent = message;
}
function showHobby(message) {
    document.getElementById("hobby").textContent = message;
}
let person = {
    fname: fname,
    age: age,
    mail: mail,
    date: date,
    innebandy: innebandy,
    sportintresse: ejSportFreak,
    showInfo: function () {
        showMessage(this.fname + ", " + this.age + ", with mail: " + this.mail +
            ". Account created: " + this.date)
    },
    showInfoHobby: function () {
        if (ejSportFreak !== "" && innebandy !== "") {
            showHobby("Fun fact: You have checked both boxes. Can't decide?")
        }
        else if (ejSportFreak !== "") {
            showHobby("Fun fact: " + this.sportintresse)
        }
        else if (innebandy !== "") {
            showHobby("Fun fact: " + this.innebandy)

        }
    }
}
person.showInfo();
person.showInfoHobby();