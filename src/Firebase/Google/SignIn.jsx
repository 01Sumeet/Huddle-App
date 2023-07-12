import "firebase/auth";
import firebase from "firebase/app";
import auth from "../firebaseConfig";
export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
};

// <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
export function SignOut() {
    return auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    )
  }

  //

