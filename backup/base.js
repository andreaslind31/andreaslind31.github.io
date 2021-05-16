"use strict";
let currentAddress = window.location.href;
let currentURL = new URL(window.location.href);
let searchParams = new URLSearchParams(currentURL.search);
let fname = searchParams.get("fname");
let mail = searchParams.get("mail");
let company = searchParams.get("checkbox1");
let justInterested = searchParams.get("checkbox2");

document.getElementById("button").addEventListener("click", startForm);
document.getElementById("darkmodeBtn").addEventListener("click", darkMode);
document.getElementById("lightmodeBtn").addEventListener("click", lightMode);

function lightMode() {
    changeToLightmode()
}
function darkMode() {
    changeToDarkmode()
}
function changeToDarkmode() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("styles").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "txtfiles/darkmode.txt", true);
    xhttp.send();
    attached = true;
}
function changeToLightmode() {
    
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("styles").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "txtfiles/lightmode.txt", true);
    xhttp.send();
    attached = false;
}
function startForm(){
    validateForm()
}
function sendEmail() {
    let subject = document.forms["myForm"]["mail"].value + ": " + document.forms["myForm"]["checkbox1"].value;
    let body = document.forms["myForm"]["message"].value + ": " + document.forms["myForm"]["fname"].value;
    Email.send({
        Host: "smtp.gmail.com",
        Username: "andreaslindtesting@gmail.com",
        Password: "Testing123!",
        To: 'andreaslind31@gmail.com',
        From: "andreaslindtesting@gmail.com",
        Subject: subject,
        Body: body,
    })
        .then(function (message) {
            alert("mail sent successfully")
        });
}
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
function validateForm() {
    let fname = document.forms["myForm"]["fname"].value;
    let mail = document.forms["myForm"]["mail"].value;
    let message = document.forms["myForm"]["message"].value;
    if (fname === "") {
        alert("Name must be filled out");
        return false;
    }
    if (mail === "") {
        alert("Mail must be filled out");
        return false;
    }
    if (message === "") {
        alert("It helps to have a message");
        return false;
    }
    if (document.querySelector("#checkbox3:checked") !== null &&
        document.querySelector("#checkbox5:checked") !== null) {
        alert("You have checked both boxes. Can't decide?!");
        return false;
    }
    else if (validateEmail(mail) == false) {
        alert("Write a correct email")
        return false;
    } else {
        sendEmail();
        return true;
    }
}
console.log(currentAddress);
console.log("Name: ", fname);
console.log("Mail: ", mail);
console.log("Body:", );
console.log("Company:", company);
console.log("Just interested: ", justInterested);