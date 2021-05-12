const btn = document.querySelector(".material-icons")
const sorts = [
    "relevance",
    "date-posted-desc",
    "date-taken-desc",
    "interestingness-desc",
]
const hits = [
    "15",
    "30",
    "60",
    "100",
]
let imgCounter = 0;
let pageCounter = 1;
let counter = 1;
let myLightbox = document.getElementById("myLightbox");

btn.addEventListener("click", async function () {
    pageCounter = 1;
    ApiSearch();

});
myLightbox.addEventListener("click", function (event) {
    if (event.target !== event.currentTarget) {
      return;
    }
    CloseImg();
  })
async function ApiSearch() {
    
    let images = document.getElementsByTagName('img');
    while (images.length > 0) {
        images[0].parentNode.removeChild(images[0]);
    }
    let searchText = document.forms["myForm"]["input"].value;
    if (searchText === "") {
        alert("Enter a value in the search box")
        return;
    }
    let sort = document.querySelector("#sort").value;
    let hitsPerPage = document.querySelector("#imgPerPage").value;
    const apikey = "8bc0311411d1a1580dc8435bbc341930";
    const response = await fetch(`https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${apikey}&text=${searchText}&per_page=${hits[hitsPerPage]}&page=${pageCounter}&sort=${sorts[sort]}&format=json&nojsoncallback=1`);
    // const response = await fetch("https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=8bc0311411d1a1580dc8435bbc341930&text=" + searchFor + "&per_page=32&page=" + pagecounter + "&format=json&nojsoncallback=1")
    const data = await response.json()

    document.getElementById("h2").innerText = data.photos.total + " images of '" + searchText + "' were found on flickr.com";
    document.getElementById("pages").innerText = "Page " + pageCounter + "/" + data.photos.pages;
    console.log(data.photos);

    for (let photo of data.photos.photo) {
        const farmId = photo.farm
        const serverId = photo.server
        const id = photo.id
        const secret = photo.secret
        const url = 'https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg'
        const img = document.createElement("img")
        const gallery = document.getElementById("gallery");
        const divElem = document.createElement("div")
        const lightboxContent = document.getElementById("lightbox-content");
        const imgForLightbox = document.createElement("img");

        img.src = url;
        img.setAttribute("class", "pictures");
        img.setAttribute("onClick", "OpenImg();currentImg(" + imgCounter + ")");
        imgCounter++;
        gallery.appendChild(img);

        divElem.setAttribute("class", "lightboxImg")
        lightboxContent.appendChild(divElem)
        divElem.style.display = 'none';

        imgForLightbox.src = url;
        divElem.appendChild(imgForLightbox)
        console.log(farmId)
    }
};
function OpenImg() {
    myLightbox.style.display = 'block';
}
function CloseImg() {
    myLightbox.style.display = "none";
}
function PrevPage() {
    pageCounter--;

    if (pageCounter < 1) {
        swal("Sorry!", "...you are already on the first page");
        pageCounter = 1;
    }
    ApiSearch();
}
function NextPage() {
    console.log(pageCounter)
    pageCounter++;
    ApiSearch();

}
function SetValues(counter) {
    var next = document.getElementsByClassName('pictures');
    if (counter == 1) {
        for (var i = 0; i < next.length; i++) {
            if (i > 20) {
                next[i].style.display = 'none';
            }
            else {
                next[i].style.display = 'block';
            }
        }
    }
    if (counter == 2) {
        for (var i = 0; i < next.length; i++) {
            if (i < 20 || i > 40) {
                next[i].style.display = 'none';
            }
            else {
                next[i].style.display = 'block';
            }
        }
    }
    if (counter == 3) {
        for (var i = 0; i < next.length; i++) {
            if (i < 40 || i > 60) {
                next[i].style.display = 'none';
            }
            else {
                next[i].style.display = 'block';
            }
        }
    }
    if (counter == 4) {
        for (var i = 0; i < next.length; i++) {
            if (i < 60 || i > 80) {
                next[i].style.display = 'none';
            }
            else {
                next[i].style.display = 'block';
            }
        }
    }
}
function currentImg(index) {
    ImgLightbox(index);
}
function ImgLightbox(index) {
    let i;
    let slides = document.getElementsByClassName("lightboxImg");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[index].style.display = "block";
}
