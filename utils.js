"use strict";

let currentAddress = window.location.href;
console.log(currentAddress);

let currentURL = new URL(window.location.href);
console.log(currentURL);
console.log(currentURL.search);

let searchParams = new URLSearchParams(currentURL.search);