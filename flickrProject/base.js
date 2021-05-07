"use strict";
let currentAddress = window.location.href;
let currentURL = new URL(window.location.href);
let searchParams = new URLSearchParams(currentURL.search);
let search = searchParams.get("input");
let slideIndex = 1;
document.getElementById("btnSubmit").addEventListener("click", startForm);
document.getElementById("btnClear").addEventListener("click", clearForm);
document.getElementById("prev").addEventListener("click", function () {
  decPage()
})
document.getElementById("next").addEventListener("click", function () {
  addPage()
})
function clearForm() {
  clear()
}
function clear() {
  document.location.reload();
}
function startForm() {
  getPhotos(1)
}
function getPhotos(slideIndex) {
  let searchFor = document.forms["myForm"]["input"].value;
  let settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=8bc0311411d1a1580dc8435bbc341930&text=" + searchFor + "&per_page=10&page=" + slideIndex + "&format=json&nojsoncallback=1",
    "method": "GET",
    "headers": {}
  }
  if (searchFor === "") {
    settings.url = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=8bc0311411d1a1580dc8435bbc341930&per_page=10&page=2&format=json&nojsoncallback=1"
  }

  $.ajax(settings).done(function (data) {
    console.log(data);

    $("#galleryTitle").append(data.photos.photo[0].title + " Gallery");
    $.each(data.photos.photo, function (i, gp) {
      i = 1;
      let farmId = gp.farm;
      let serverId = gp.server;
      let id = gp.id;
      let secret = gp.secret;

      console.log(farmId + ", " + serverId + ", " + id + ", " + secret);

      //  https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

      $("#flickr").append('<img src="https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg" style="width:20%" onclick="openModal();currentSlide(i)" class="hover-shadow">');
      // document.getElementById("mySlides").append('<div class="numbertext">' + i + ' / 20</div>');
      // document.getElementById("mySlides").append('<img src="https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg" style="width:100%">');
      i++;
    });
  });
}
function addPage() {
  getPhotos(slideIndex + 1);
}
function decPage() {
  if (slideIndex < 1) {
    alert("You are at the first page")
    return true;
  } else { getPhotos(slideIndex - 1); }

}

// Open the Modal
function openModal() {
  document.getElementById("myModal").style.display = "block";
}

// Close the Modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

showSlides(slideIndex);

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
