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
  doc,
  addDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  collection,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
const storage = getStorage(app);

// Get a reference to the UI elements
const imageInput = document.getElementById("image");
const recipeForm = document.getElementById("recipe-form");
const recipeContainer = document.getElementById("recipe-container");
const signInButton = document.getElementById("sign-in-button");
const signOutButton = document.getElementById("sign-out-button");
const userName = document.getElementById("user-name");
const userPhoto = document.getElementById("user-photo");
const recipesButton = document.getElementById("yellow");

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
    //Show the my recipes button
    recipesButton.style.display = "block";

    // Get the user's uid
    const uid = user.uid;
    // Add an event listener to the recipe form submission
    recipeForm.addEventListener("submit", async (event) => {
      // Prevent the default behavior of the form
      event.preventDefault();
      // Get the values from the input fields
      const name = recipeForm["name"].value;
      const ingredientOne = recipeForm["ingredient_one"].value;
      const ingredientTwo = recipeForm["ingredient_two"].value;
      const ingredientThree = recipeForm["ingredient_three"].value;
      const ingredientFour = recipeForm["ingredient_four"].value;
      const note = recipeForm["note"].value;
      // Get the image file from the input element
      const imageFile = imageInput.files[0];
      // Check if there is an image file
      if (imageFile) {
        // Upload the image file and get its download URL
        uploadImage(uid, imageFile).then(
          (url) => {
            // Check if the url is valid
            if (url) {
              // Create a recipe object with the values and the imageUrl
              const recipe = {
                name,
                ingredientOne,
                ingredientTwo,
                ingredientThree,
                ingredientFour,
                note,
                imageUrl: url,
              };
              // Save the recipe to Firestore using the user's uid as the parent document ID and an auto-generated ID as the subdocument ID
              // Replace setDoc with addDoc and pass a collection reference instead of a document reference
              addDoc(collection(db, "users", uid, "recipes"), recipe).then(
                () => {
                  // Display a success message
                  alert("Recipe added successfully!");
                  // Reset the form fields
                  recipeForm.reset();
                },
                (error) => {
                  // Handle any errors
                  console.error(error);
                  // Display an error message
                  alert(
                    "An error occurred while saving the recipe: " +
                      error.message
                  );
                }
              );
            } else {
              // The url is not valid
              // Display an error message
              alert("The image upload failed.");
            }
          },
          (error) => {
            // Handle any errors
            console.error(error);
            // Display an error message
            alert(
              "An error occurred while uploading the image: " + error.message
            );
          }
        );
      } else {
        // There is no image file
        // Create a recipe object with only values and no imageUrl
        const recipe = {
          name,
          ingredientOne,
          ingredientTwo,
          ingredientThree,
          ingredientFour,
          note,
        };
        // Save the recipe to Firestore using the user's uid as the parent document ID and an auto-generated ID as the subdocument ID
        // Replace setDoc with addDoc and pass a collection reference instead of a document reference
        addDoc(collection(db, "users", uid, "recipes"), recipe).then(
          () => {
            // Display a success message
            alert("Recipe added successfully!");
            // Reset the form fields
            recipeForm.reset();
          },
          (error) => {
            // Handle any errors
            console.error(error);
            // Display an error message
            alert(
              "An error occurred while saving the recipe: " + error.message
            );
          }
        );
      }
    });
    // Get a reference to the collection where you store the recipes
    const recipesRef = collection(db, "users", uid, "recipes");

    // Attach a listener to the collection using the onSnapshot function
    onSnapshot(
      recipesRef,
      (querySnapshot) => {
        // Get an array of document changes in the snapshot using the querySnapshot.docChanges method
        const docChanges = querySnapshot.docChanges();
        // Loop through each document change
        docChanges.forEach((docChange) => {
          // Get the snapshot data
          const snapshotData = docChange.doc.data();
          // Get the document ID
          const docId = docChange.doc.id;
          // Check the type of change
          switch (docChange.type) {
            case "added":
              // The document was added
              // Create a new div element to display the recipe
              const div = document.createElement("div");
              div.className = "col mb-4";
              div.id = `${docId}`; // Add an id to the div element for easy removal
              div.innerHTML = `
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">${snapshotData.name}</h5>
                <p class="card-text">Ingredients:</p>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">${snapshotData.ingredientOne}</li>
                  <li class="list-group-item">${snapshotData.ingredientTwo}</li>
                  <li class="list-group-item">${snapshotData.ingredientThree}</li>
                  <li class="list-group-item">${snapshotData.ingredientFour}</li>
                </ul>
                <p class="card-text">Notes: ${snapshotData.note}</p>
              </div>
              <div class="card-footer">
                <button id="edit-button" class="btn btn-warning" value="Edit Recipe">Edit Recipe</button>
                <button id="delete-button" class="btn btn-danger" value="Delete Recipe">Delete Recipe</button>
              </div>
            </div>
          `;
              // Append the div element to the recipe container
              recipeContainer.appendChild(div);
              // Add event listeners to the edit and delete buttons
              const editButton = div.querySelector("#edit-button");
              editButton.addEventListener("click", () => {
                // Call the editRecipe function
                editRecipe(uid, docId);
              });
              const deleteButton = div.querySelector("#delete-button");
              deleteButton.addEventListener("click", () => {
                // Call the deleteRecipe function
                deleteRecipe(uid, docId);
              });
              break;
            case "modified":
              // The document was modified
              // Check if there is an existing div element with the same id as the document ID
              const existingDiv = document.getElementById(docId);
              if (existingDiv) {
                // There is an existing div element
                // Update the div element with the snapshot data
                existingDiv.querySelector(".card-title").textContent =
                  snapshotData.name;
                existingDiv.querySelector(
                  ".list-group-item:nth-child(1)"
                ).textContent = snapshotData.ingredientOne;
                existingDiv.querySelector(
                  ".list-group-item:nth-child(2)"
                ).textContent = snapshotData.ingredientTwo;
                existingDiv.querySelector(
                  ".list-group-item:nth-child(3)"
                ).textContent = snapshotData.ingredientThree;
                existingDiv.querySelector(
                  ".list-group-item:nth-child(4)"
                ).textContent = snapshotData.ingredientFour;
                existingDiv.querySelector(
                  ".card-text"
                ).textContent = `Notes: ${snapshotData.note}`;
              }
              break;
            case "removed":
              // The document was removed
              // Check if there is an existing div element with the same id as the document ID
              const removedDiv = document.getElementById(docId);
              if (removedDiv) {
                // There is an existing div element
                // Remove the div element from the page
                removedDiv.remove();
              }
              break;
          }
          // Check if there is an imageUrl in the snapshot data
          if (snapshotData.imageUrl) {
            // There is an imageUrl
            // Create a new img element to display the image
            const img = document.createElement("img");
            img.src = snapshotData.imageUrl;
            img.alt = snapshotData.name;
            img.className = "card-img-top";
            // Find the div element with the same id as the document ID
            const div = document.getElementById(docId);
            if (div) {
              // There is a div element
              // Insert the img element before the card body
              const cardBody = div.querySelector(".card-body");
              if (cardBody) {
                // There is a card body
                const cardTitle = cardBody.querySelector(".card-title");
                // Insert the img element before card title
                cardBody.insertBefore(img, cardTitle);
              }
            }
          }
        });
      },
      (error) => {
        // This is the error callback
        // Handle the error here
        // For example, log the error to the console
        console.error(error);
      }
    );
  } else {
    // User is signed out
    // Clear the user's information from the global variable or the local storage
    window.currentUser = null;
    // localStorage.removeItem("currentUser");

    // Update the UI elements
    // Hide the user's name and photo in the nav bar
    userName.textContent = "Guest";
    userPhoto.src = "./assets/knife_fork_icon-6a4a4b01.png";
    // Hide the sign out button and show the sign in button
    signOutButton.style.display = "none";
    signInButton.style.display = "block";
    // Hide my recipes button
    recipesButton.style.display = "none";
    // Clear the recipe container
    recipeContainer.innerHTML = "";
  }
});

// Define the deleteRecipe function
function deleteRecipe(uid, docId) {
  // Get a reference to the document
  const docRef = doc(db, "users", uid, "recipes", docId);
  // Delete the document
  deleteDoc(docRef)
    .then(() => {
      // Display a success message
      alert("Recipe deleted successfully!");
      // Get a reference to the div element
      const div = document.getElementById(docId);
      // Remove the div element from the recipe container
      recipeContainer.removeChild(div);
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
}

//define the uploadImage function as an async function
async function uploadImage(uid, imageFile) {
  // Create a reference to the file
  const fileRef = ref(storage, `${uid}/${imageFile.name}`);
  try {
    // Upload the file bytes and await for the promise
    await uploadBytes(fileRef, imageFile);
    // Display a success message
    alert("Image uploaded successfully!");
    // Get the download URL of the file and await for the promise
    const url = await getDownloadURL(fileRef);
    // Return the download URL directly
    return url;
  } catch (error) {
    // Handle any errors
    console.error(error);
  }
}

// define the editRecipe function
function editRecipe(uid, docId) {
  // Get a reference to the document
  const docRef = doc(db, "users", uid, "recipes", docId);
  // Prompt the user for new values for each field of the recipe
  let newName = prompt(`Enter a new name for ${name}:`);
  let newIngredientOne = prompt(`Enter a new ingredient #1 for ${name}:`);
  let newIngredientTwo = prompt(`Enter a new ingredient #2 for ${name}:`);
  let newIngredientThree = prompt(`Enter a new ingredient #3 for ${name}:`);
  let newIngredientFour = prompt(`Enter a new ingredient #4 for ${name}:`);
  let newNote = prompt(`Enter a new note for ${name}:`);
  // Check if any of the values are empty or null
  if (
    !newName ||
    !newIngredientOne ||
    !newIngredientTwo ||
    !newIngredientThree ||
    !newIngredientFour ||
    !newNote
  ) {
    // Display an error message
    alert("Please enter valid values for all fields.");
    // Return from the function
    return;
  }
  // Create a recipe object with the new values
  const recipe = {
    name: newName,
    ingredientOne: newIngredientOne,
    ingredientTwo: newIngredientTwo,
    ingredientThree: newIngredientThree,
    ingredientFour: newIngredientFour,
    note: newNote,
  };
  // Update the document with the recipe object
  // Replace setDoc with updateDoc and pass a document reference as before
  updateDoc(docRef, recipe)
    .then(() => {
      // Display a success message
      alert("Recipe updated successfully!");
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
      // Display an error message
      alert("An error occurred while updating the recipe: " + error.message);
    });
}

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
