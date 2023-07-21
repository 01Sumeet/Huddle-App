import { useUserChat } from "../Context/UserChatContext";
import { useAuthContext } from "../Context/authContext";
import MessageBoxLeft from "./MessageBox/MessageBoxLeft";
import MessageBoxRight from "./MessageBox/MessageBoxRight";
import { v4 as uuidv4 } from "uuid";

const Chat = () => {
  const { currentUser } = useAuthContext();
  const { userChat, sender } = useUserChat();

  const combinedId =
    currentUser.uid > sender?.uid
      ? currentUser.uid + sender?.uid
      : sender?.uid + currentUser.uid;

  console.log(userChat);
  return (
    <>
      {userChat?.messages?.map((msg, index) =>
        msg.senderId === currentUser?.uid ? (
          <MessageBoxRight data={msg} key={uuidv4()} />
        ) : (
          <MessageBoxLeft data={msg} sender={sender} key={uuidv4()} />
        )
      )}
    </>
  );
};
export default Chat;
