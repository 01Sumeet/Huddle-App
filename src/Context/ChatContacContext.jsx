import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../Firebase/firebaseConfig";
import { collection, doc, onSnapshot, query } from "firebase/firestore";

export const chatContactContext = createContext({
  chatContact: [],
  setChatContact: () => {},
});

// here component that retuen context
export const ChatContactContextProvider = (prop) => {
  const [chatContact, setChatContact] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "userChats"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      try {
        const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
        const data = snapshot.docs.map((doc) => doc.data());
        setChatContact(data);
        console.log("valuee", data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error appropriately, e.g., show an error message to the user.
      }
    });
  }, []);

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
