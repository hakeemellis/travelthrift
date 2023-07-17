document.addEventListener('DOMContentLoaded', () => {


    const db = firebase.firestore();
    const auth = firebase.auth();
    const storage = firebase.storage()

// get the login button element
const loginBtn = document.getElementById("login-button");

// add event listener to the login button element
loginBtn.addEventListener("click", (e) => {
  e.preventDefault(); // prevent the default form submission behavior

  // check if user is already signed in
  if (firebase.auth().currentUser) {
    alert("You are already signed in!");
    return;
  }

  // get the user input values
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // sign in the user
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((result) => {
      // signed in successfully
      console.log(result);
      const uid = result.user.uid; // get the user's uid
      const userRef = db.collection("users").doc(uid); // get the user document in "users" collection
      userRef.get().then((doc) => {
        if (doc.exists) {
          console.log("User document data:", doc.data());
          window.location.href = "../html/index.html"; // redirect to home page
        } else {
          // user document doesn't exist
          console.log("User document doesn't exist");
        }
      }).catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message)
    });
});

    

})