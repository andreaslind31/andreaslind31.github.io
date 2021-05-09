"use strict";
let currentAddress = window.location.href;
let currentURL = new URL(window.location.href);
let searchParams = new URLSearchParams(currentURL.search);
let search = searchParams.get("input");
let slideIndex = 1;
let hideSubmitBtn = document.getElementById("btnSubmit");
let hideClearBtn = document.getElementById("btnClear");
let placeholderInput = document.getElementById("input");
let hideInputBox = document.getElementById("input");
hideClearBtn.style.display = "none";

document.getElementById("btnSubmit").addEventListener("click", function () {
  getPhotos()
  hideSubmitBtn.style.display = "none";
  hideClearBtn.style.display = "block";
  hideInputBox.style.display = "none";
});

document.getElementById("btnClear").addEventListener("click", function () {
  document.location.reload();
  hideSubmitBtn.style.display = "block";
  hideClearBtn.style.display = "none";
  hideInputBox.style.display = "block";
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
      $("#row").append('<div class="column"><img src="https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg" style="width:100%" onclick="openModal();currentSlide(' + slideIndex + ')" class="hover-shadow"></div>');
      $(".modal-content").append('<div id="slides" class="mySlides"><img src="https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg" style="width:100%"></div>');
      $("#demo").append('<div id="secondCol" class="column"><img class="demo cursor" src="https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg" style="width:100%" onclick="currentSlide(' + slideIndex + ')"></div>');
      slideIndex++;
    });
    createAside();
    createFooter();
  });

}
function createAside() {
  $("#sectionAside").append('<aside id="leftmenu"></aside>');
  $("#leftmenu").append('<div><h3>Interested?</h3><a href="#contact"><h4>Contact me!</h4></a></div>');                         
}
function createFooter() {
  $("#sectionFooter").append('<footer id="footer"></footer>');
  $("#footer").append('<article id="summary"></article>');
  $("#summary").append('<h3>Summary</h3>');
  $("#summary").append('<div><p>This page was done using HTML5, CSS, JavaScript with flickrs API.<br> Methods used: <i>search, getRecent.</i></p></div>');
  $("#footer").append('<article id="contact"><h3>Contact me</h3></article>');
  $("#contact").append('<div><a href="https://www.linkedin.com/in/andreas-lind31/"><img src="img/LI-In-Bug.png"></a><a href="https://github.com/andreaslind31"><img src="img/GitHub_Logo.png" width="100px"></a></div>');
  $("#contact").append('<br><div><img src="img/mail-outline 1.svg"><span> andreaslind31@gmail.com</span></div>');
}
function openModal() {
  document.getElementById("myModal").style.display = "block";
}
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}
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

