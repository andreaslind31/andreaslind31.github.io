"use strict";

let currentAddress = window.location.href;
console.log(currentAddress);

let currentURL = new URL(window.location.href);
console.log(currentURL);
console.log(currentURL.search);

let searchParams = new URLSearchParams(currentURL.search);

let fname = searchParams.get("fname");
let mail = searchParams.get("mail");
let company = searchParams.get("checkbox1");
let justInterested = searchParams.get("checkbox2");

console.log("Name: ", fname);
console.log("Mail: ", mail);
console.log("Body:", );
console.log("Company:", company);
console.log("Just interested: ", justInterested);

function showMessage(message) {
    document.getElementById("input").textContent = message;
}
function showHobby(message) {
    document.getElementById("hobby").textContent = message;
}
function showMail(message) {
    document.getElementById("mail").textContent = message;
}
let person = {
    fname: fname,
    mail: mail,
    company: company,
    justInterested: justInterested,
    showInfo: function () {
        showMessage(this.fname)
    },
    showInfoHobby: function () {
        if (justInterested !== null) {
            showHobby( this.justInterested)
        }
        else if (floorball !== null) {
            showHobby( this.company)
        }
    },
    showInfoMail: function(){
        showMail(this.mail)
    },
}
person.showInfo();
showMail(person.mail);
person.showInfoHobby();