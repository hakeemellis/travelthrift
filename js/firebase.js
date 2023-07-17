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



// get the signup button element
const signupBtn = document.getElementById("signup-button");

// add event listener to the signup button element if it exists
if (signupBtn) {
  signupBtn.addEventListener("click", (e) => {
    e.preventDefault(); // prevent the default form submission behavior

    // check if user is already signed in
    if (firebase.auth().currentUser) {
      // user is already signed in
      alert("You are already a user. If you want to sign up, please sign out first.");
      return;
    }

    // get the user input values
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // create user account
    auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // create user document in "users" collection
        db.collection("users").doc(result.user.uid).set({
          firstname: firstname,
          lastname: lastname,
          email: email
        })
        .then(() => {
          console.log("User document created");
          window.location.href = "../html/login.html"; // redirect to login page
        })
        .catch((error) => {
          console.log(error.code);
          console.log(error.message);
        });
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  });
}


  // get the upload button element
  const uploadBtn = document.getElementById("upload-button");

  // add event listener to the upload button element
  if (uploadBtn) {
  uploadBtn.addEventListener("click", (e) => {
    e.preventDefault(); // prevent the default form submission behavior
    uploadFile(); // call the uploadFile function
  });

  function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    const uid = auth.currentUser.uid; // get the user's uid
    const storageRef = storage.ref();
    const profilePhotoRef = storageRef.child(`profilePhotos/${uid}/${file.name}`); // include uid in the file path
    const uploadTask = profilePhotoRef.put(file);
    const uploadProgress = document.getElementById("upload-progress");
    uploadProgress.style.display = "block"; // show progress bar
  
    uploadTask.on('state_changed',
      (snapshot) => {
        // track upload progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        uploadProgress.value = progress; // update progress bar
      },
      (error) => {
        // handle upload errors
        console.log(error.code);
        console.log(error.message);
      },
      () => {
        // handle successful upload
        console.log('Upload successful');
      }
    );
  }
}


// get the login button element
const loginBtn = document.getElementById("login-button");

// add event listener to the login button element
if (loginBtn) {
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

}

// get the logout button element
const logoutBtn = document.getElementById("logout-button");

// add event listener to the logout button element
if (logoutBtn) {
logoutBtn.addEventListener("click", (e) => {
  e.preventDefault(); // prevent the default form submission behavior

  // check if user is logged in
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // user is logged in, so log them out
      firebase.auth().signOut().then(() => {
        console.log("User logged out successfully");
        window.location.href = "../html/logout.html"; // redirect to login page
      }).catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
    } else {
      // user is not logged in, so redirect them to login page
      window.location.href = "../html/login.html";
    }
  });
});

}



const profileButton = document.getElementById("profile-button");

profileButton.addEventListener("click", () => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // user is signed in, load profile.html
      window.location.href = "profile.html";
    } else {
      // user is not signed in, load login.html
      window.location.href = "login.html";
    }
  });
});




  })