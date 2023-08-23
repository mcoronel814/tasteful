// Import our custom CSS
import "./styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

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
const button = document.querySelector("#signin");

// Get a reference to the UI elements
const signInButton = document.getElementById("sign-in-button");
const signOutButton = document.getElementById("sign-out-button");
const userName = document.getElementById("user-name");
const userPhoto = document.getElementById("user-photo");
const recipesButton = document.getElementById("yellow"); 

const lightBlue = document.getElementById("lightBlue"); 
const lightPink = document.getElementById("lightPink"); 
const darkBlue = document.getElementById("darkBlue"); 


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
        // userName.textContent = user.displayName;
        userPhoto.src = user.photoURL;
        // Show the sign out button and hide the sign in button
        signOutButton.style.display = "block";
        signInButton.style.display = "none";
        //Show the my recipes button
        recipesButton.style.display = "block";
    } else {
        // User is signed out
        // Clear the user's information from the global variable or the local storage
        window.currentUser = null;
        // localStorage.removeItem("currentUser");

        // Update the UI elements
        // Hide the user's name and photo in the nav bar

        // userName.textContent = "Guest";

        // userPhoto.src = "./assets/knife_fork_icon-6a4a4b01.png";


        // Hide the sign out button and show the sign in button
        signOutButton.style.display = "none";
        signInButton.style.display = "block";
        // Hide my recipes button
        recipesButton.style.display = "none";


        lightBlue.style.marginRight = "25px";
        lightPink.style.marginRight = "25px";
        darkBlue.style.marginRight = "25px";
        signInButton.style.marginRight = "25px";
        signInButton.style.marginLeft = "25px";

        lightBlue.style.width = "192px"
        lightPink.style.width = "192px"
        darkBlue.style.width = "192px"
        signInButton.style.width = "192px"
        // lightBlue.style.marginRight = "40px";
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

button?.addEventListener("click", (clickEvent) => {
    firebaseSignInWithRedirect(auth, new GoogleAuthProvider());
});
