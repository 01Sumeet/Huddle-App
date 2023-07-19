import { Box } from "@mui/material";
import MessageBoxLeft from "./MessageBox/MessageBoxLeft";
import MessageBoxRight from "./MessageBox/MessageBoxRight";
import { DummyContacts } from "../Data/Contact";
import { useContext, useEffect, useState } from "react";
import { db } from "../Firebase/firebaseConfig";
import {  onSnapshot, doc } from "firebase/firestore";
import { AuthContext } from "../AuthContext/authContext";

const Chat = () => {
  const { currentUser } = useContext(AuthContext);
  const [chats, setChat] = useState([]);

  // useEffect(() => {
  //   const getChatsData = () => {
  //     const unSub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
  //       setChat(doc.data);
  //     });

  //     return () => {
  //       unSub();
  //     };
  //   };
  //   currentUser.uid && getChatsData()
  // }, [currentUser]);



  return (
    <>
      {DummyContacts?.messages
        ?.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
        .map((msg, index) =>
          msg.sender === "left" ? (
            <MessageBoxLeft data={msg} key={index} />
          ) : (
            <MessageBoxRight data={msg} key={index} />
          )
        )}
    </>
  );
};

export default Chat;
