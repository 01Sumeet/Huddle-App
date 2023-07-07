import { createContext, useContext } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";

const AuthContext = createContext();

export const ContextProvider = ({ children }) => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth,provider)
  };
};

// export const userAuth = () => {
//   return useContext(AuthContext)
// };

