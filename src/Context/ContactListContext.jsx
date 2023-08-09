import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { db } from "../Firebase/firebaseConfig";

export const ContactListContext = createContext({
  contactList: [],
  setContactList: () => {},
});

export const ContactListContextProvider = (prop) => {
  const [contactList, setContactList] = useState([]);

  // here we fetch data from database for users Contact lists
  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      try {
        const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
        const data = snapshot.docs.map((doc) => doc.data());

        setContactList(data);
      } catch (error) {
        console.log(error);
      }
      return () => {
        unsubscribe();
      };
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ContactListContext.Provider
      value={{ contactList, setContactList }}
      {...prop}
    ></ContactListContext.Provider>
  );
};

// this custom hook will provide contact list across the appp
export const useContactListContext = () => {
  const queryContextProp = useContext(ContactListContext);
  return {
    ...queryContextProp,
  };
};
