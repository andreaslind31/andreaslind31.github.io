"use strict";
let currentAddress = window.location.href;
let currentURL = new URL(window.location.href);
let searchParams = new URLSearchParams(currentURL.search);
let search = searchParams.get("input");
let submitBtn = document.getElementById("btnSubmit");
// let clearBtn = document.getElementById("btnClear");
let inputBox = document.getElementById("input");
let myLightbox = document.getElementById("myLightbox");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let galleryTitle = document.getElementById("galleryTitle");
let slideIndex = 1;
// clearBtn.style.display = "none";

submitBtn.addEventListener("click", function () {
  clearPage();
  getPhotos();
  // hideTitle();
});
submitBtn.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    // Trigger the button element with a click
    submitBtn.click();
  }
});
myLightbox.addEventListener("click", function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closeLightbox();
})
prev.addEventListener("click", function () {
  plusSlides(-1)
})
next.addEventListener("click", function () {
  plusSlides(1)
})

function clearPage() {
  let images = document.getElementsByTagName('img');
  while (images.length > 0) {
    images[0].parentNode.removeChild(images[0]);
  }
  let columClass = document.getElementsByClassName('column');
  while (columClass.length > 0) {
    columClass[0].parentNode.removeChild(columClass[0]);
  }
}
function getPhotos() {
  let searchFor = document.forms["myForm"]["input"].value;
  let perPageValue = "60";
  let pageValue = "1";
  let sortValue = "relevance";
  let settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=8bc0311411d1a1580dc8435bbc341930&sort="+sortValue+"&text=" + searchFor +
      "&per_page="+perPageValue+"&page="+pageValue+"&format=json&nojsoncallback=1",
    "method": "GET",
    "headers": {}
  }
  if (searchFor === "") {
    alert("Enter a value in the search box")
  }

  $.ajax(settings).done(function (data) {
    console.log(data);

    $.each(data.photos.photo, function (slideIndex, gp) {
      let farmId = gp.farm;
      let serverId = gp.server;
      let id = gp.id;
      let secret = gp.secret;

      console.log(farmId + ", " + serverId + ", " + id + ", " + secret);
      //förändra till fetch
      // this creates elements and images
      $("#grid").append('<div class="column"><img src="https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret +
        '.jpg" style="width:100%" onclick="openLightbox();currentSlide(' + slideIndex + ')" class="hover-shadow"></div>');
      $(".lightbox-content").append('<div class="mySlides"><img src="https://farm' + farmId + '.staticflickr.com/' + serverId + '/' +
        id + '_' + secret + '.jpg" style="width:100%"></div>');

      slideIndex++;
    });
  });
  
}
// function hideTitle() {
//   let images = document.getElementsByTagName('img');
//     while (images.length > 0) {
//       galleryTitle.style.display = "none";
//     }
// }
function openLightbox() {
  myLightbox.style.display = "block";
}
function closeLightbox() {
  myLightbox.style.display = "none";
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

