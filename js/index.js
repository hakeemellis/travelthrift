document.addEventListener('DOMContentLoaded', () => {

    // setting up firebase with our website
    const firebaseApp = firebase.initializeApp({
      apiKey: "AIzaSyByqwNDJwqy_QL_sGviF9sGHtfbAEQLbwg",
      authDomain: "travel-thrift.firebaseapp.com",
      projectId: "travel-thrift",
      storageBucket: "travel-thrift.appspot.com",
      messagingSenderId: "304032397640",
      appId: "1:304032397640:web:83b3eaa2d659b512715b7d"
    }); 
    const db = firebaseApp.firestore();
    const auth = firebaseApp.auth();
    const storage = firebaseApp.storage()

  
    

    

})