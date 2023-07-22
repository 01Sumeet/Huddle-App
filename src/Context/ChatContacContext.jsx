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
    try {
      const q = query(collection(db, "userChats"));
      var data = [];
      onSnapshot(q, (allChats) => {
        allChats.forEach((doc) => {
          data.unshift(doc.data());
        });
        // data = null;
        console.log(data);
        // console.log(typeof data);
      });
    } catch (error) {
      console.log(error);
    }
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
