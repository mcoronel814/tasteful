// Import our custom CSS
import './styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

//firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  onAuthStateChanged,
  signInWithRedirect as firebaseSignInWithRedirect, // Rename the imported function
  getRedirectResult as firebaseGetRedirectResult, // Rename the imported function
  GoogleAuthProvider,
  signOut as firebaseSignOut, // Rename the imported function
} from "firebase/auth";
import {
  getFirestore,
  collection,
  CollectionReference,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATnGOJTDgXe1hmwMY2lMEG-bsJGyUVxfU",
  authDomain: "tasteful-48763.firebaseapp.com",
  projectId: "tasteful-48763",
  storageBucket: "tasteful-48763.appspot.com",
  messagingSenderId: "347686408324",
  appId: "1:347686408324:web:190251749ae113d26bb2d1",
  measurementId: "G-BYQK03XM3E",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();

// Get a reference to the UI elements
const signInButton = document.getElementById("sign-in-button");
const signOutButton = document.getElementById("sign-out-button");
const userName = document.getElementById("user-name");
const userPhoto = document.getElementById("user-photo");

// Create an instance of the GoogleAuthProvider class
const provider = new GoogleAuthProvider();

// Sign in with redirect
function mySignInWithRedirect() {
  // Use a different name for your custom function
  // Redirect the user to the Google sign-in page
  firebaseSignInWithRedirect(auth, provider).catch((error) => {
    // Use the renamed imported function
    // Handle errors here
  });
}

// Get redirect result
function myGetRedirectResult() {
  // Use a different name for your custom function
  // Get the user's information after they sign in
  firebaseGetRedirectResult(auth)
    .then((result) => {
      // Use the renamed imported function
      // The signed-in user info is in result.user
    })
    .catch((error) => {
      // Handle errors here
    });
}

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    // Store the user's information in a global variable or a local storage
    window.currentUser = user;
    // localStorage.setItem("currentUser", JSON.stringify(user));

    // Update the UI elements
    // Show the user's name and photo in the nav bar
    userName.textContent = user.displayName;
    userPhoto.src = user.photoURL;
    // Show the sign out button and hide the sign in button
    signOutButton.style.display = "block";
    signInButton.style.display = "none";
  } else {
    // User is signed out
    // Clear the user's information from the global variable or the local storage
    window.currentUser = null;
    // localStorage.removeItem("currentUser");

    // Update the UI elements
    // Hide the user's name and photo in the nav bar
    userName.textContent = "";
    userPhoto.src = "";
    // Hide the sign out button and show the sign in button
    signOutButton.style.display = "none";
    signInButton.style.display = "block";
  }
});

// Sign out
function mySignOut() {
  // Use a different name for your custom function
  firebaseSignOut(auth)
    .then(() => {
      // Use the renamed imported function
      // Sign-out successful
    })
    .catch((error) => {
      // Handle errors here
    });
}

// Attach event listeners to the buttons
signInButton.addEventListener("click", mySignInWithRedirect); // Use your custom function name
signOutButton.addEventListener("click", mySignOut); // Use your custom function name

// Call getRedirectResult when the page loads
myGetRedirectResult(); // Use your custom function name






//script4.js


var reviewCount = 0;
var markCount = 0;

var map2 = document.getElementById("map");
map2.classList.remove("col-6")
// map.style.width= "5000px";



// var blue1 = document.getElementById("blue1");
// blue1.style.display = "none";
// var yellow1 = document.getElementById("yellow1");
// yellow1.style.display = "none";


function state2()
{
  console.log("hello-123")
}



const recipeContainer = document.getElementById('recipes');

// Replace 'YOUR_API_KEY' with your actual API key
const apiKey = '1';

// Number of recipes to retrieve
const numberOfRecipes = 3;

// Fetch recipes from TheMealDB API
async function fetchRecipes() {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v2/${apiKey}/randomselection.php`);
        const data = await response.json();
        
        const recipes = data.meals.slice(0, numberOfRecipes);
        displayRecipes(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}


// Display recipes in the HTML container
function displayRecipes(recipes) {
    recipeContainer.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('col');
        
        // Truncate instructions to the first 100 words
        const truncatedInstructions = truncateText(recipe.strInstructions, 45);
        
        recipeCard.innerHTML = `
        <span class="hiddentxt">
            <h2 id="RecipeName" >${recipe.strMeal}</h2>
        </span>
        <span class="hiddenimg">
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" id="recipePic" >
            </span>
            <p id="instruction" >${truncatedInstructions}</p>
            <button id="btnRecipe" > 
            
            <a href="${recipe.strYoutube}" target="_blank"> Check Recipe </a>
            
            </button>
            <hr id="recipe1">


        `;
        
        recipeContainer.appendChild(recipeCard);
    });
}


// Helper function to truncate text to a specified number of words
function truncateText(text, maxLength) {
    const words = text.split(' ');
    if (words.length > maxLength) {
        return words.slice(0, maxLength).join(' ') + '...';
    }
    return text;
}

// Fetch and display recipes when the page loads
// fetchRecipes();






function stars(numberOfStars)
{
          
  


  const container = document.getElementById("imageContainer");

  const imageWidth = 13;   
  const imageHeight = 13;  

  for (let i = 0; i < Math.round(numberOfStars); i++) {


      const imageBox = document.createElement("div");
      imageBox.className = "image-box";


      const image = document.createElement("img");
      image.src = "star.png";
      image.alt = "Image " + (i + 1);
      image.style.width = imageWidth + "px";
      image.style.height = imageHeight + "px";

      imageBox.appendChild(image);
      container.appendChild(imageBox);


  }
}















body1 = document.getElementById("body1");
blue1 = document.getElementById("blue1");

function newLayout(reviews,rating)
{


  // const reviews = "hello";
  // blue1.style.
  // <p id="rating" >  ${visited}  </p>
     body1.innerHTML = '';
     const rate1 = document.createElement('div');
     rate1.classList.add('note');
     rate1.innerHTML = `<h2 id="rate1" > ${rating} </h2>
     <div class="image-container" id="imageContainer">
     
     `

    //  stars(rating);

     body1.appendChild(rate1);

            for (let i = 0; i < 3; i++) {

                const author = reviews[i]['author_name'];
                const text =  reviews[i]['text'];
                const rating =  reviews[i]['rating'];
                const visited =  reviews[i]['relative_time_description'] ;

                const reviewCard = document.createElement('div');
                reviewCard.classList.add('col');
                
                reviewCard.innerHTML = 

                `
                <h2 id="author" > ${author} </h2>

        


               
                <p id="visited" > ${visited} </p>

       

                <p id="review" > ${text} </p>

                <hr id="greyLine">
                
                `


                body1.appendChild(reviewCard);

                // stars(rating);

                //console.log(`Author: `, reviews[i]['author_name'] + "\n " + `Reviews: `, reviews[i]['text'] + "\n " +  "rating:  " + reviews[i]['rating'] + "\n " + "Visited:  "  + reviews[i]['relative_time_description'] );           
            
            }

    // console.log(reviews);

}


function oldLayout()
{
  body1.innerHTML = '';
  const div = document.createElement('div');
  div.classList.add('row');
  div.innerHTML = `
  <div class="col">
  <form action="">
    <input type="search" id="searchBar" placeholder="   " />
    <img src="search.png" alt="search" id="search" />
  </form>

  <br />
  <br />
  <br />
  <br />
  <br />
  <br />

  <h1 id="restaurantName"></h1>
  <br />

  <!-- <div id="starRate">  -->

  <h5 id="restaurantScore"></h5>

  <h5 id="restaurantType">
    <br />
  </h5>

 
  <!-- stars -->
  <div class="image-container" id="imageContainer"></div>
  <br />
  <br />

  <!-- </div> -->

</div>
<div class="row">
  <div class="col">
  <div id="myTopnav" class="topnav">
  <a href="#" class="active" id="Overview">Overview</a>
  <a href="#" id="reviews"> Reviews</a>
</div>
 <hr class="greyLine" /> 
  </div>
</div>


<!--   -->

<div class="row">
  <div class="col">
    <p id="describeA">Big Slices with creamy artichokes topping & other</p>

    <p id="describeB">unique twist draw crowds to this casual pie spot.</p>

    <p id="describeC">Dine-in - Takeout - Delivery</p>

    <hr class="greyLine" />  

    <br />
    <br />

    <img src="placeholder.png" alt="" id="pinA" />
    <h5 id="address"></h5>

    <img src="link.png" alt="" id="linkB" />
    <h5 id="website"></h5>

    <br />

    <img src="time.png" alt="" id="timeC" />

    <p id="OpeningHours"></p>

    <br />
    <br />
    <p></p>
  </div>
</div>

  
  `

  body1.appendChild(div);


}






















const restaurants = [];

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.7128, lng: -74.0060 },
    zoom: 15,
  });

  const userLocation = { lat: 40.7128, lng: -74.0060 };





  // navigator.geolocation.getCurrentPosition(
  //   function(position) {
  //       // Retrieve latitude and longitude from the position object
  //       var userLat = position.coords.latitude;
  //       var userLng = position.coords.longitude;

  //       // Create a map centered on the user's location
  //       var map = new google.maps.Map(document.getElementById('map'), {
  //           center: { lat: userLat, lng: userLng },
  //           zoom: 15
  //       });



  //     const  userLocation = { lat: userLat, lng: userLng};







  const service = new google.maps.places.PlacesService(map);

service.nearbySearch(
    {
      location: userLocation,
      radius: 5000,
      type: "restaurant",
    },
    async (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (const place of results) {
          const details = await new Promise((resolve, reject) => {
            service.getDetails(
              {
                placeId: place.place_id,
                fields: ["name", "formatted_address", "geometry.location", "reviews", "rating", "types", "website", "editorial_summary","price_level", "opening_hours"],
              },
              (placeDetails, placeStatus) => {
                if (placeStatus === google.maps.places.PlacesServiceStatus.OK) {
                  resolve(placeDetails);
                } else {
                  reject(placeStatus);
                }
              }
            );
          });
  
          const restaurant = {
            name: details.name,
            address: details.formatted_address,
            location: details.geometry.location,
            reviews: details.reviews,
            rating: details.rating,
            types: details.types,
            website: details.website,
            url: details.url,  
            editorial_summary: details.editorial_summary,
            price_level: details.price_level,
            opening_hours: details.opening_hours


          };
          restaurants.push(restaurant);
  
          




          const marker = new google.maps.Marker({
            position: restaurant.location,
            map: map,
            title: restaurant.name,

            

          });

          



          const infowindow2 = new google.maps.InfoWindow({
            content: `<strong>${restaurant.name}</strong><br>${restaurant.address}<br><a href="${restaurant.website}" target="_blank">Visit Website</a>`,
          });

          marker.addListener("click", () => {


            if (reviewCount > 0 )
            {
              oldLayout();
            }



            blue1.style.display = "block";
            map.classList.remove("col-12")
            map.classList.add("col-6");
            map2.className = "col-6";
            // map.style.width= "5000px";
            blue1.style.display = "block";
            yellow1.style.display = "block";
            
            
           // 

var imageContainers = document.getElementsByClassName("image-box");
for (var i = 0; i < imageContainers.length; i++) {
    imageContainers[i].style.display = "none";
}


            fetchRecipes();
            const name = restaurant.name;
            document.getElementById("restaurantName").innerHTML = name;

            var rating = restaurant.rating;

            stars(rating);
            
            var price_level  = restaurant.price_level;
            var price_level1 = "";

            if ( price_level == 1)
            {
              price_level1 = "$ ~ Inexpensive";
            } else if ( price_level == 2)
            {
              price_level1 = "$$ ~ Moderate";
            }else if ( price_level == 3)
            {
              price_level1 = "$$$ ~ Expensive";
            }else if ( price_level == 4)
            {
              price_level1 = "$$$$ ~ Very Expensive";
            }




            // const container = document.getElementById("imageContainer");
            // const numberOfImages = rating ;
    
            // const imageWidth = 15;   
            // const imageHeight = 15;  
    
            // for (let i = 0; i < Math.round(numberOfImages); i++) {
    
    
            //     const imageBox = document.createElement("div");
            //     imageBox.className = "image-box";
    
            //     const image = document.createElement("img");
            //     image.src = "star.png";
            //     image.alt = "Image " + (i + 1);
            //     image.style.width = imageWidth + "px";
            //     image.style.height = imageHeight + "px";
    
            //     imageBox.appendChild(image);
            //     container.appendChild(imageBox);

            //     numberOfImages = 0;


            // }







            

              document.getElementById("restaurantScore").innerHTML = rating ;
            // document.getElementById("restaurantScore").innerHTML = price_level1 ;

            


            var types = restaurant.types;
            types = types[0];
            types = types[0].toUpperCase() + types.substring(1);

            document.getElementById("restaurantType").innerHTML = types + " Place";

            const address = restaurant.address;

            document.getElementById("address").innerHTML = address;

            const opening_hours = restaurant.opening_hours['weekday_text'];



            // console.log("first", opening_hours);

            let weekday1 = "";

            for (let i = 0; i < opening_hours.length; i++) {
            if (opening_hours[i] != ",") {
                weekday1 = weekday1 + opening_hours[i] + "<br>";
                // console.log(weekday1);
                }   
            }



             document.getElementById("OpeningHours").innerHTML =  "Opening Hours: <br> " + weekday1  ;
            //  console.log("This is a line." + "<br>" + "This is another line.");
            // document.getElementById("OpeningHours").innerHTML =  opening_hours  ;






















            const website = restaurant.website;
            
            // const link = document.getElementById("website");

            // link.setAttribute("href", website);



            document.getElementById("website").innerHTML = website;



            // document.getElementById("Reviews").innerHTML =reviews;

            // const change = state2();

            // if (change)
            // {
            //   newLayout(reviews);
            // }





            //Reviews
            // for (let i = 0; i < 5; i++) {
            //     console.log(`Author: `, reviews[i]['author_name'] + "\n " + `Reviews: `, reviews[i]['text'] + "\n " +  "rating:  " + reviews[i]['rating'] + "\n " + "Visited:  "  + reviews[i]['relative_time_description'] );
            //    }





      //   const reviews = restaurant.reviews;
      //   var reviews2 = document.getElementById("reviews");
      //   reviews2.addEventListener("click", function() {
      //     reviewCount += 1;

      //     newLayout(reviews,rating);
      //     console.log("step1 finished");

      //     marker.addEventListener("click", oldLayout);
      //     console.log("step2 finished");

      // });

      // marker.addEventListener("click", oldLayout);

  


            
          



            
            
            



            
        });



    }
  }
    }
);
}

  // )} 




// });
