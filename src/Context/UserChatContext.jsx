import { collection, onSnapshot, query } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../Firebase/firebaseConfig";

export const userChatContext = createContext({
  userChat: [],
  setUserChat: () => {},
  sender: [],
  setSender: () => {},
});

export const UserChatContextprovider = (prop) => {
  const [userChat, setUserChat] = useState([]);
  const [sender, setSender] = useState([]);

  // From this useEffect We will get user Chat data
  const q = query(collection(db, "chats"));
  useEffect(() => {
    try {
      const chatData = [];

      onSnapshot(q, (chat) => {
        chat.forEach((doc) => {
          chatData.splice(0, 1);
          chatData.push(doc.data());
          console.log("chatttttt", chatData);
        });
      });
       setUserChat(chatData);

      console.log("Kahliiii", chatData);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <userChatContext.Provider
      value={{ userChat, setUserChat, sender, setSender }}
      {...prop}
    ></userChatContext.Provider>
  );
};
// custom Hook to provide userChat data to across the app
export const useUserChat = () => {
  const queryUserChatProp = useContext(userChatContext);
  return {
    ...queryUserChatProp,
  };
};
