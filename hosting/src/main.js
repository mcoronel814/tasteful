// Import our custom CSS
import "./styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

//image toggling function
var images = [
  // "pictures/meal1.png",
  // "pictures/meal3.png",
  // "pictures/meal8.png",
    "./meal1.png",
    "./meal3.png",
    "./meal8.png",
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
