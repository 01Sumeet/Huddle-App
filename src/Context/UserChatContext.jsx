import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../Firebase/firebaseConfig";
import { useAuthContext } from "./authContext";

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

  console.log("greater", currentUser?.uid, sender?.uid);
  console.log("greater", currentUser?.uid > sender?.uid);
  console.log("I am sender", sender);

  // From this useEffect We will get user Chat data

  useEffect(() => {
    try {
      onSnapshot(doc(db, "chats", combinedId), (doc) => {
        console.log("iammm", combinedId);
        const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(source, " data: ", doc.data());
        const data = doc.data();
        setUserChat(data);
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
