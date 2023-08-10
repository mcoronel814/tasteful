var images = [
    "meal1.png",
    "meal3.png",
    "meal8.png",
];

var imgElement = document.getElementById("pinkPicture");
var currentImageIndex = 0;

function toggleImage() {
    imgElement.src = images[currentImageIndex];
    currentImageIndex++;
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
}

setInterval(toggleImage, 1000);

