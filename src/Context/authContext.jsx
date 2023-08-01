import { useEffect, createContext, useState, useContext } from "react";
import { auth } from "../Firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext({
  currentUser: [],
  setCurrentUser: () => {},
});

export const AuthContextProvider = (prop) => {
  const [currentUser, setCurrentUser] = useState([]);

  // this will return authentication value
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      // console.log("Sumit", user);
    });

    unSub();
  }, [currentUser?.uid]);

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser }}
      {...prop}
    ></AuthContext.Provider>
  );
};

// this custom hook will provide auth data to across the app
export const useAuthContext = () => {
  const queryAuthContext = useContext(AuthContext);
  return {
    ...queryAuthContext,
  };
};
