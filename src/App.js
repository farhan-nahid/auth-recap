import firebase from "firebase/app";
import "firebase/auth";
import { useState } from "react";
import { firebaseConfig } from "./firebase.config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

function App() {
  const [user, setUser] = useState({});
  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const githubProvider = new firebase.auth.GithubAuthProvider();

  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;

        var token = credential.accessToken;
        var user = result.user;
        console.log(user, token);
        setUser(user);

        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;

        console.log(errorCode, errorMessage, email, credential);
        // ...
      });
  };

  const handleFacebookSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        var accessToken = credential.accessToken;
        setUser(user)
        console.log(user, accessToken);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;

        console.log(errorCode, errorMessage, email, credential);
        // ...
      });
  };

  const handleGithubSignIn = () => {
    firebase
  .auth()
  .signInWithPopup(githubProvider)
  .then((result) => {
    var credential = result.credential;
    var token = credential.accessToken;
    var user = result.user;
    setUser(user)
    console.log(user, token);
    // ...
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;

    console.log(errorCode, errorMessage, email, credential);
    // ...
  });
  }
  return (
    <div>
      <button onClick={handleGoogleSignIn}>Sign In With Google</button>
      <button onClick={handleFacebookSignIn}>Sign In With Facebook</button>
      <button onClick={handleGithubSignIn}>Sign In With Github</button>
      <h1>User Name : {user.displayName}</h1>
      <img src={user.photoURL} alt=".." />
      <h3> User  Email :{user.email}</h3>
    </div>
  );
}

export default App;
