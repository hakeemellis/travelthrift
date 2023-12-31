  // Copyright Notice //
  console.log(`
  Copyright (c) 2023 Hakeem Ellis
  All rights reserved.

  This work is licensed under the terms of the Custom Code license.
  For a copy, see https://github.com/hakeemellis/portfolio/blob/main/LICENSE.md.

  Contact: utilize the contact form at https://hakeemellis.com/
  `);

document.addEventListener('DOMContentLoaded', () => {
    
    const db = firebase.firestore();
    const auth = firebase.auth();
    const storage = firebase.storage()


// get the logout button element
const logoutBtn = document.getElementById("logout-button");

// add event listener to the logout button element
logoutBtn.addEventListener("click", (e) => {
  e.preventDefault(); // prevent the default form submission behavior

  // check if user is logged in
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // user is logged in, so log them out
      firebase.auth().signOut().then(() => {
        console.log("User logged out successfully");
        window.location.href = "logout.html"; // redirect to login page
      }).catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
    } else {
      // user is not logged in, so redirect them to login page
      window.location.href = "login.html";
    }
  });
});


    

})