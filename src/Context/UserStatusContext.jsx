import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { db } from "../Firebase/firebaseConfig";
import { useAuthContext } from "./AuthContext";
import { useContext } from "react";

export const StatusContext = createContext({
  status: [],
  setStatus: () => {},
});

export const UserStatusProvider = (prop) => {
  const [status, setStatus] = useState();
  const { currentUser } = useAuthContext();

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "users", `${currentUser?.uid}`),
      (docSnap) => {
        try {
          const source = docSnap.metadata.hasPendingWrites ? "Local" : "Server";
          const data = docSnap?.data();
          console.log(source, " data: ", docSnap.data());
          setStatus(data);
        } catch (error) {
          console.log(error);
        }
      }
    );
    return () => {
      unSub();
    };
  }, [currentUser?.uid]);

  return (
    <StatusContext.Provider
      value={{ status, setStatus }}
      {...prop}
    ></StatusContext.Provider>
  );
};

//

export const useStatusContext = () => {
  const querryContextProp = useContext(StatusContext);
  return {
    ...querryContextProp,
  };
};
