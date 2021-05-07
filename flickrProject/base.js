"use strict";
let currentAddress = window.location.href;
let currentURL = new URL(window.location.href);
let searchParams = new URLSearchParams(currentURL.search);
let search = searchParams.get("input");
let slideIndex = 1;
document.getElementById("btnSubmit").addEventListener("click", function () {
  getPhotos()
});
document.getElementById("btnClear").addEventListener("click", function () {
  document.location.reload();
});
document.getElementById("prev").addEventListener("click", function () {
  plusSlides(-1)
})
document.getElementById("next").addEventListener("click", function () {
  plusSlides(1)
})

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

    // $("#galleryTitle").append(data.photos.photo[0].title + " Gallery");
    $.each(data.photos.photo, function (slideIndex, gp) {
      let farmId = gp.farm;
      let serverId = gp.server;
      let id = gp.id;
      let secret = gp.secret;

      console.log(farmId + ", " + serverId + ", " + id + ", " + secret);

      //  https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
      $("#flickr").append('<div class="column">'); 
      $("#flickr").append('<img src="https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg" style="width:100%" onclick="openModal();currentSlide('+slideIndex+')" class="hover-shadow">');
      $("#flickr").append('</div>');
      $("#mySlides").append('<div class="mySlides">');
      $("#mySlides").append('<div class="numbertext">' + slideIndex + ' / 20</div>');
      $("#mySlides").append('<img src="https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg" style="width:100%">');
      $("#mySlides").append('</div>');
      $("#demo").append('<div class="column">');
      $("#demo").append('<img class="demo cursor" src="https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg" style="width:100%" onclick="currentSlide('+slideIndex+')">');
      $("#demo").append('</div">');
      slideIndex++;
    });
  });
}

// Open the Modal
function openModal() {
  document.getElementById("myModal").style.display = "block";
}
// Close the Modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}


// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}
// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  captionText.innerHTML = dots[slideIndex - 1].alt;
}

showSlides(slideIndex);