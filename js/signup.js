document.addEventListener('DOMContentLoaded', () => {

    const db = firebase.firestore();
    const auth = firebase.auth();
    const storage = firebase.storage()
  
    // get the signup button element
const signupBtn = document.getElementById("signup-button");

// add event listener to the signup button element
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

  // get the upload button element
  const uploadBtn = document.getElementById("upload-button");

  // add event listener to the upload button element
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

    

})