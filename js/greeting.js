document.addEventListener('DOMContentLoaded', () => {

    
    const db = firebase.firestore();
    const auth = firebase.auth();
    const storage = firebase.storage()

//To display greeting for user signed in

const greeting = document.getElementById("greeting");

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in, get the user's first name from Firestore
    const uid = user.uid;
    const userRef = db.collection("users").doc(uid);
    userRef.get().then((doc) => {
      if (doc.exists) {
        const firstName = doc.data().firstname;
        greeting.textContent = `Hello, ${firstName}`;
      } else {
        console.log("User document doesn't exist");
      }
    }).catch((error) => {
      console.log(error.code);
      console.log(error.message);
    });
  } else {
    // User is signed out, display "Hello Guest"
    greeting.textContent = "Hello Guest";
  }
});
    

})