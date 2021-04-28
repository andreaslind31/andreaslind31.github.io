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
function showMail(message) {
    document.getElementById("mail").textContent = message;
}
function showDate(message) {
    document.getElementById("date").textContent = message;
}
let person = {
    fname: fname,
    age: age,
    mail: mail,
    date: date,
    innebandy: innebandy,
    sportintresse: ejSportFreak,
    showInfo: function () {
        showMessage(this.fname + ", " + this.age)
    },
    showInfoHobby: function () {
        if (ejSportFreak !== null) {
            showHobby( this.sportintresse)
        }
        else if (floorball !== null) {
            showHobby( this.floorball)
        }
        else {
            showHobby("You are an empty soul." +
            " With neither interest in floorball or being 'not interested in sports'. Doesnt even make sense.")
        }
    },
    showInfoMail: function(){
        showMail(this.mail)
    },
    showInfoDate: function(){
        showDate(this.date)
    }
}
person.showInfo();
showMail(person.mail);
showDate(person.date);
person.showInfoHobby();