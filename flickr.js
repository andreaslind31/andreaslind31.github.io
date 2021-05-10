"use strict";
let currentAddress = window.location.href;
let currentURL = new URL(window.location.href);
let searchParams = new URLSearchParams(currentURL.search);
let search = searchParams.get("input");
let submitBtn = document.getElementById("btnSubmit");
let clearBtn = document.getElementById("btnClear");
let inputBox = document.getElementById("input");
let slideIndex = 1;

clearBtn.style.display = "none";

submitBtn.addEventListener("click", function () {
  clearPage();
  getPhotos();
  clearBtn.style.display = "block";
});
// inputBox.addEventListener("keyup", function (event) {
//   if (event.keyCode === 13) {
//     // Trigger the button element with a click
//     submitBtn.click();
//   }
// });
clearBtn.addEventListener("click", function () {
  document.location.reload();
  clearBtn.style.display = "none";
  flickrInfo.style.display = "none";
});
document.getElementById("prev").addEventListener("click", function () {
  plusSlides(-1)
})
document.getElementById("next").addEventListener("click", function () {
  plusSlides(1)
})
function clearPage() {
  let images = document.getElementsByTagName('img');
  while (images.length > 0) {
    images[0].parentNode.removeChild(images[0]);
  }
  let footer = document.getElementsByTagName('footer');
  while (footer.length > 0) {
    footer[0].parentNode.removeChild(footer[0]);
  }
  let aside = document.getElementsByTagName('aside');
  while (aside.length > 0) {
    aside[0].parentNode.removeChild(aside[0]);
  }
  let columClass = document.getElementsByClassName('column');
  while (columClass.length > 0) {
    columClass[0].parentNode.removeChild(columClass[0]);
  }
}
function getPhotos() {

  let searchFor = document.forms["myForm"]["input"].value;
  let settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=8bc0311411d1a1580dc8435bbc341930&text=" + searchFor +
      "&per_page=50&page=1&format=json&nojsoncallback=1",
    "method": "GET",
    "headers": {}
  }
  if (searchFor === "") {
    settings.url = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=8bc0311411d1a1580dc8435bbc341930&per_page=50&page=1&format=json&nojsoncallback=1"
  }

  $.ajax(settings).done(function (data) {
    console.log(data);

    $.each(data.photos.photo, function (slideIndex, gp) {
      let farmId = gp.farm;
      let serverId = gp.server;
      let id = gp.id;
      let secret = gp.secret;

      console.log(farmId + ", " + serverId + ", " + id + ", " + secret);

      // this creates elements and images
      $("#row").append('<div class="column"><img src="https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret +
        '.jpg" style="width:100%" onclick="openModal();currentSlide(' + slideIndex + ')" class="hover-shadow"></div>');
      $(".modal-content").append('<div class="mySlides"><img src="https://farm' + farmId + '.staticflickr.com/' + serverId + '/' +
        id + '_' + secret + '.jpg" style="width:100%"></div>');

      slideIndex++;
    });
    createAside();
    createFooter();
    if (searchFor === "") {
      document.getElementById("galleryTitle").innerText = "A gallery of random pictures";
    } else {
      document.getElementById("galleryTitle").innerText = "A gallery of your choice";
    }
  });
}
function createAside() {
  $("#sectionAside").append('<aside id="leftmenu"></aside>');
  $("#leftmenu").append('<div><h3>How was this done?</h3><br><a href="#contact"><h4>Learn more</h4></a></div>');
}
function createFooter() {
  $("#sectionFooter").append('<footer id="footer"></footer>');
  $("#footer").append('<article id="summary"></article>');
  $("#summary").append('<h3>Summary<a href="#home"><i>take me TOP</i></a></h3><p>Pictures from<a href="https://www.flickr.com/"><img src="/img/flickr-logo.png" width="10%"></a>');
  $("#summary").append('<div><p>The page was done using HTML5, CSS, JavaScript with flickrs API.<br> Methods used: <i>search, getRecent.</i></p></div>');
  $("#footer").append('<article id="contact"><h3>Contact me</h3></article>');
  $("#contact").append('<div><a href="https://www.linkedin.com/in/andreas-lind31/"><img src="/img/LI-In-Bug.png"></a><a href="https://github.com/andreaslind31"><img src="/img/GitHub_Logo.png" width="100px"></a></div>');
  $("#contact").append('<br><div><img src="/img/mail-outline 1.svg"><span> andreaslind31@gmail.com</span></div>');
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
function currentSlide(n) {
  showSlides(slideIndex = n);
}
function showSlides(n) {
  let i;
  let slides = $(".mySlides");
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex].style.display = "block";
}

showSlides(slideIndex);

