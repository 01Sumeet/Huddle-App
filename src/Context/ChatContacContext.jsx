import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../Firebase/firebaseConfig";
import {
  collection,
  doc,
  onSnapshot,
  or,
  query,
  where,
} from "firebase/firestore";
import { useAuthContext } from "./AuthContext";

export const chatContactContext = createContext({
  chatContact: [],
  setChatContact: () => {},
});

// here component that retuen context
export const ChatContactContextProvider = (prop) => {
  const [chatContact, setChatContact] = useState([]);
  const { currentUser } = useAuthContext();

  useEffect(() => {
    if (!currentUser?.uid) {
      return;
    }
    const q = query(
      collection(db, "chats"),
      or(
        where("reciverUid", "==", currentUser?.uid),
        where("senderUid", "==", currentUser?.uid)
      )
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      try {
        const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
        const data = snapshot.docs.map((doc) => doc.data());
        setChatContact(data,);
      } catch (error) {
        console.log(error);
      }
      return () => {
        unsubscribe();
      };
    });
    // try {
    //   const q = query(collection(db, "users"));
    //   onSnapshot(q, (userContacts) => {
    //     const data = [];
    //     userContacts.forEach((doc) => {
    //       data.push(doc.data());
    //     });
    //     setContactList(data);
    //   });
    // } catch (error) {
    //   console.log(error);
    // }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.uid]);

  return (
    <chatContactContext.Provider
      value={{ chatContact, setChatContact }}
      {...prop}
    ></chatContactContext.Provider>
  );
};

// custom Hook to provide data
export const useAllChatsContact = () => {
  const queryAllChatsContact = useContext(chatContactContext);
  return {
    ...queryAllChatsContact,
  };
};
