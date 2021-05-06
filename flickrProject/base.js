"use strict";
// let apiurl, myresult, apiurl_size, selected_size, searchFor;
// searchFor = document.forms["myForm"]["search"].value;
// apiurl = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=8bc0311411d1a1580dc8435bbc341930&text=" + searchFor+"&per_page=10&page=1&format=json&nojsoncallback=1";

//#region 
// $(document).ready(function () {
//   $("#sq").click(function () {
//     selected_size = 75;
//   })
// });
// $(document).ready(function () {
//   $("#lg-sq").click(function () {
//     selected_size = 150;
//   })
// });
// $(document).ready(function () {
//   $("#thumb").click(function () {
//     selected_size = 100;
//   })
// });
// $(document).ready(function () {
//   $("#small").click(function () {
//     selected_size = 240;
//   })
// });
// $(document).ready(function () {
//   $("#mid").click(function () {
//     selected_size = 500;
//   })
// });
// $(document).ready(function () {
//   $("#ori").click(function () {
//     selected_size = 640;
//   })
// });

//olika event metoder för olika sizes ovanför för buttons i html

// selected_size = 240;
// $(document).ready(function () {
//   $('#button').click(function () {
//     $.getJSON(apiurl, function (json) {
//       $.each(json.photos.photo, function (i, myresult) {
//         apiurl_size = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=8bc0311411d1a1580dc8435bbc341930&photo_id=" + myresult.id + "&format=json&nojsoncallback=1";
//         $.getJSON(apiurl_size, function (size) {
//           $.each(size.sizes.size, function (i, myresult_size) {
//             if (myresult_size.width == selected_size) {
//               $("#results").append('<p><a href="' + myresult_size.url + '" target="_blank"><img src="' + myresult_size.source + '"/></a></p>');
//             }
//           })
//         })
//       });
//     });
//   });
// });
//#endregion
//ovanför finns en nästan fungerande version där bara sök-delen inte funkar
let currentAddress = window.location.href;
let currentURL = new URL(window.location.href);
let searchParams = new URLSearchParams(currentURL.search);
let search = searchParams.get("input");

document.getElementById("btnSubmit").addEventListener("click", startForm);
document.getElementById("btnClear").addEventListener("click", clearForm);

function clearForm() {
  clear()
}
function clear() {
  document.location.reload();
  console.clear();
  
}
function startForm() {
  getPhotos()
}
function getPhotos() {
  let searchFor = document.forms["myForm"]["input"].value;
  let settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=8bc0311411d1a1580dc8435bbc341930&text=" + searchFor + "&per_page=10&page=1&format=json&nojsoncallback=1",
    "method": "GET",
    "headers": {}
  }
  if (searchFor === "") {
    settings.url = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=8bc0311411d1a1580dc8435bbc341930&per_page=10&page=1&format=json&nojsoncallback=1"
  }
  
  $.ajax(settings).done(function (data) {
    console.log(data);

    $("#galleryTitle").append(data.photos.photo[0].title + " Gallery");
    $.each(data.photos.photo, function (i, gp) {

      let farmId = gp.farm;
      let serverId = gp.server;
      let id = gp.id;
      let secret = gp.secret;

      console.log(farmId + ", " + serverId + ", " + id + ", " + secret);

      //  https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

      $("#flickr").append('<img src="https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg"/>');

    });
  });
}
