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
  useEffect(() => {
    try {
      const q = query(collection(db, "chats"));
      const chatData = [];
      onSnapshot(q, (chat) => {
        chat.forEach((doc) => {
          chatData.push(doc.data());
        });
      });
      setUserChat(chatData);

      console.log("chatttttt", chatData);
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
