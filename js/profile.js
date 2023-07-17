document.addEventListener('DOMContentLoaded', () => {

    const db = firebase.firestore();
    const auth = firebase.auth();
    const storage = firebase.storage()


const firstNameElement = document.getElementById("firstname");
const lastNameElement = document.getElementById("lastname");
const profilePhotoElement = document.getElementById("profilePhoto");

firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    const userId = user.uid;
    const userDocRef = db.collection("users").doc(userId);

    try {
      const userDoc = await userDocRef.get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        firstNameElement.innerText = userData.firstname;
        lastNameElement.textContent = userData.lastname;

        const profilePhotosRef = storage.ref(`profilePhotos/${userId}/`);
        const result = await profilePhotosRef.listAll();

        if (result.items.length > 0) {
          const url = await result.items[0].getDownloadURL();
          profilePhotoElement.src = url;
        } else {
          console.log("No files found in profile Photos folder");
        }
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error getting document or profile photo:", error);
    }
  } else {
    window.location.href = "login.html";
  }
});

    

    

})