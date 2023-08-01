import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../Firebase/firebaseConfig";
import { useAuthContext } from "./AuthContext";

export const userChatContext = createContext({
  userChat: [],
  setUserChat: () => {},
  sender: [],
  setSender: () => {},
});

export const UserChatContextprovider = (prop) => {
  const [userChat, setUserChat] = useState([]);
  const [sender, setSender] = useState([]);
  const { currentUser } = useAuthContext();

  //

  const combinedId =
    currentUser?.uid > sender?.uid
      ? currentUser?.uid + sender?.uid
      : sender?.uid + currentUser?.uid;

  // From this useEffect We will get user Chat data
  useEffect(() => {
    try {
 
      onSnapshot(doc(db, "chats", `${combinedId}`), (doc) => {
        // console.log("iammm", combinedId);
        const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        const data = doc.data();
        if (data !== undefined && data !== "undefined") {
          setUserChat(data);
        } else {
          setUserChat([]);
        }
      });
      // const chatData = [];
      // onSnapshot(q, (chat) => {
      //   chat.forEach((doc) => {
      //     chatData.splice(0, 1);
      //     chatData.push(doc.data());
      //     console.log("chatttttt", doc);
      //   });
      // });
      // setUserChat(chatData);
      // console.log("Kahliiii", chatData);
    } catch (error) {
      console.log(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sender]);

  // console.log("userChat", userChat);
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
