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
  doc,
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
const db = getFirestore(app);

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

async function saveRecipe(event) {
  // Prevent the form from reloading the page
  event.preventDefault();

  // Get the form data
  const name = document.getElementById("name").value;
  const ingredient_one = document.getElementById("ingredient_one").value;
  const ingredient_two = document.getElementById("ingredient_two").value;
  const ingredient_three = document.getElementById("ingredient_three").value;
  const ingredient_four = document.getElementById("ingredient_four").value;
  const note = document.getElementById("note").value;

  // Create a recipe object
  const recipe = {
    name: name,
    ingredient_one: ingredient_one,
    ingredient_two: ingredient_two,
    ingredient_three: ingredient_three,
    ingredient_four: ingredient_four,
    note: note,
  };

  // Get the user’s uid from Firebase Auth module
  const user = auth.currentUser;
  const uid = user.uid;

  // Create a reference to a collection called “recipes” and use the user’s uid as a subcollection
  const recipesRef = collection(db, "recipes", uid);

  // Write the recipe object to Firestore
  await add(recipesRef, recipe);

  // Show a success message
  alert("Recipe saved!");
}

// Read data from Firestore when the page loads
function loadRecipes() {
  // Get the user’s uid from Firebase Auth module
  const user = auth.currentUser;
  const uid = user.uid;

  // Create a reference to a collection called “recipes” and use the user’s uid as a subcollection
  const recipesRef = collection(db, "recipes", uid);

  // Listen for real-time changes in Firestore
  onSnapshot(recipesRef, (querySnapshot) => {
    // Clear the previous recipes
    document.getElementById("recipe-container").innerHTML = "";

    // Loop through each document
    querySnapshot.forEach((doc) => {
      // Get the recipe object from the document
      const recipe = doc.data();

      // Display the recipe on the page
      const div = document.createElement("div");
      div.innerHTML = `
          <h3>${recipe.name}</h3>
          <ul>
            <li>${recipe.ingredient_one}</li>
            <li>${recipe.ingredient_two}</li>
            <li>${recipe.ingredient_three}</li>
            <li>${recipe.ingredient_four}</li>
          </ul>
          <p>${recipe.note}</p>
        `;
      document.getElementById("recipe-container").appendChild(div);
    });
  });
}

// Attach event listeners to the buttons
signInButton.addEventListener("click", mySignInWithRedirect); // Use your custom function name
signOutButton.addEventListener("click", mySignOut); // Use your custom function name
document.getElementById("recipe-form").addEventListener("submit", saveRecipe);

// Call the loadRecipes function when the page loads
window.onload = loadRecipes;

// Call getRedirectResult when the page loads
myGetRedirectResult(); // Use your custom function name