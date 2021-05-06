// //#region 
// const URL = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=8bc0311411d1a1580dc8435bbc341930&text=banan&per_page=20&format=json&nojsoncallback=1";
// // const URL = "https://andreaslind31.github.io/";
// let HOST = "farm";
// let SERVER = "65535";
// let PORT = 443; // HTTP:80, HTTPS:443
// let PATH = "services/apps/72157719108690079/";
// let QUERY = 'key=value';

// fetch(URL)

// const btn = document.querySelector(".btn");

// btn.addEventListener("click", async function () {
//   const response = await fetch("https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=8bc0311411d1a1580dc8435bbc341930&text=banan&per_page=20&format=json&nojsoncallback=1")
//   const data = await response.json();

//   let photoId = document.querySelector(".photoId");
//   let owner = document.querySelector(".owner");
//   let secret = document.querySelector(".secret");
//   let farm = document.querySelector(".farm");
//   let title = document.querySelector(".title");
//   let photosList = document.querySelector(".photos");

//   // photoId.innerText = data.photoId;
//   // owner.innerText = data.owner;
//   // secret.innerText = data.secret;
//   // farm.innerText = data.farm;
//   // title.innerText = data.title;

//   // for (let photo of data.photosList) {
//   //   const li = document.createElement("li");
//   //   li.innerText = photo;
//   //   photosList.append(li);

//   // }

//   console.log(data.photos);
// });
//#endregion

var apiurl, myresult, apiurl_size, selected_size;
apiurl = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=8bc0311411d1a1580dc8435bbc341930&text=banana&per_page=10&page=1&format=json&nojsoncallback=1";

$(document).ready(function () {
  $("#sq").click(function () {
    selected_size = 75;
  })
});
$(document).ready(function () {
  $("#lg-sq").click(function () {
    selected_size = 150;
  })
});
$(document).ready(function () {
  $("#thumb").click(function () {
    selected_size = 100;
  })
});
$(document).ready(function () {
  $("#small").click(function () {
    selected_size = 240;
  })
});
$(document).ready(function () {
  $("#mid").click(function () {
    selected_size = 500;
  })
});
$(document).ready(function () {
  $("#ori").click(function () {
    selected_size = 640;
  })
});
$(document).ready(function () {
  $('#button').click(function () {
    $.getJSON(apiurl, function (json) {
      $.each(json.photos.photo, function (i, myresult) {
        apiurl_size = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=8bc0311411d1a1580dc8435bbc341930&photo_id=" + myresult.id + "&format=json&nojsoncallback=1";
        $.getJSON(apiurl_size, function (size) {
          $.each(size.sizes.size, function (i, myresult_size) {
            if (myresult_size.width == selected_size) {
              $("#results").append('<p><a href="' + myresult_size.url + '" target="_blank"><img src="' + myresult_size.source + '"/></a></p>');
            }
          })
        })
      });
    });
  });
});