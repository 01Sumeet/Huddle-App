import { useUserChat } from "../../Context/UserChatContext";
import { useAuthContext } from "../../Context/AuthContext";
import MessageBoxLeft from "./MessageBoxLeft";
import MessageBoxRight from "./MessageBoxRight";

const Chat = () => {
  const { currentUser } = useAuthContext();
  const { userChat, sender } = useUserChat();
  return (
    <>
      {userChat?.messages?.map((msg, index) =>
        msg.senderId === currentUser?.uid ? (
          <MessageBoxRight data={msg} key={index} />
        ) : (
          <MessageBoxLeft data={msg} sender={sender} key={index} />
        )
      )}
    </>
  );
};
export default Chat;
