import { Box, Typography, IconButton } from "@mui/material";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { BiMicrophone } from "react-icons/bi";
import { AiOutlineSend } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { BsReverseLayoutSidebarReverse } from "react-icons/bs";
import { IoCall } from "react-icons/io5";
import { CgMoreVertical } from "react-icons/cg";
import { Helmet } from "react-helmet";
import "./Chat.css";
import "../../Animation/Animation.css";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Timestamp,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useUserChat } from "../../Context/UserChatContext";
import { db } from "../../Firebase/firebaseConfig";
import { useAuthContext } from "../../Context/AuthContext";
import Chat from "../../ChatScreenComponents/MessageBox/ChatLogic";
import { useContactListContext } from "../../Context/ContactListContext";
import ContactCardList from "../../ChatScreenComponents/ContactList/ContactList";
import SideBar from "../../Assets/SideBar/SideBar";
import SearchBar from "../../Assets/SearchBar/SearchBar";
import ProfileDetails from "../../ChatScreenComponents/ProfileDetails/ProfileDetails";
import MessageInput from "../../Assets/MessageInput/MessageInput";
import MoreOption from "../../ChatScreenComponents/MoreOption/MoreOption";
import { useAllChatsContact } from "../../Context/ChatContacContext";
import { useSelectedMenu } from "../../Context/SelectedMenu";
import { usePageVisibility } from "react-page-visibility";
import PhotoPreview from "../../ChatScreenComponents/PhotoPreview/PhotoPreview";
import { onValue } from "firebase/database";

const bg_color = "#131313";
//const bg_up_color = "#2e343d";
const highlight = "#6b8afd";
const text_color = "#a9aeba";
const chatColor = "#202329";
const iconColor = "#848599";
const textHeading = "#FEFEFF";

const ChatScreen = () => {
  const containerRef = useRef(null);
  const ref = useRef(null);
  const { contactList } = useContactListContext();
  const { currentUser } = useAuthContext();
  const { sender, userChat } = useUserChat();
  const { chatContact } = useAllChatsContact();
  const { selectedMenu, imgFile, setImgFile } = useSelectedMenu();
  const [text, setText] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const container = containerRef?.current;
  const Change = userChat?.messages?.length;

  //

  const [isTabVisible, setTabVisibility] = useState(true);
  const isVisible = usePageVisibility();

  // this function ensure that weather user is online or not
  useMemo(() => {
    setTabVisibility(isVisible);
    if (currentUser?.uid) {
      updateDoc(doc(db, "users", `${currentUser?.uid}`), {
        status: isTabVisible,
        lastSeen: Timestamp.now(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);
  // Handle browser window close
  window.addEventListener("beforeunload", () => {
    // Attempt to update user's status to offline

    if (currentUser?.uid) {
      updateDoc(doc(db, "users", `${currentUser?.uid}`), {
        status: true,
        lastSeen: Timestamp.now(),
      });
    }
  });

  // this is for chat default scroll to latest chat
  useEffect(() => {
    const scrollToLastElement = () => {
      if (container) {
        container.scrollTop = container.scrollHeight;

        console.log("heightt", container.scrollHeight);
      }
    };
    scrollToLastElement();
  }, [container, Change]);

  //on hitting Enter & Escape Key to send message and go back to main screen
  const esckey = (evt) => {
    if (evt.keyCode === 27) {
      alert("Escape");
    }
    if (evt.key === "Enter") {
      if (text.trim() !== "") {
        handleSent();
      }
    }
  };

  // This will show search contact from all user database
  const searchContact = useMemo(() => {
    const data = contactList?.filter((user) => {
      return user.displayName
        .toLowerCase()
        .includes(inputSearch?.toLowerCase());
    });
    return data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputSearch]);

  // this will create new user caht in db and update message
  const handleSent = async () => {
    const combinedId =
      currentUser?.uid > sender?.uid
        ? currentUser?.uid + sender?.uid
        : sender?.uid + currentUser?.uid;

    try {
      // Here we check weather user collection exist in database
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        // If not then we will create here a database with the r
        setDoc(doc(db, "chats", combinedId), { messages: [] });

        // here we update chat between two user
        updateDoc(doc(db, "chats", combinedId), {
          lastMessage: text,
          date: Timestamp.now(),
          senderUid: sender?.uid,
          reciverUid: currentUser?.uid,
          messages: arrayUnion({
            id: uuidv4(),
            img: "",
            text: text,
            senderId: currentUser?.uid,
            date: Timestamp.now(),
          }),
          SenderInfo: {
            pin: false,
            senderId: sender?.uid,
            displayName: sender?.displayName,
            photoURL: sender?.photoURL,
          },
          ReciverInfo: {
            pin: false,
            reciever: currentUser?.uid,
            displayName: currentUser?.displayName,
            photoURL: currentUser?.photoURL,
          },
        });

        setText("");
      } else {
        // here we update chat between two user
        updateDoc(doc(db, "chats", combinedId), {
          messages: arrayUnion({
            id: uuidv4(),
            image: "",
            text: text,
            senderId: currentUser?.uid,
            date: Timestamp.now(),
          }),
        });

        // Here we update last Messages for the user
        updateDoc(doc(db, "chats", combinedId), {
          lastMessage: text,
          date: Timestamp.now(),
        });
      }

      setText("");
      setImgFile(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Chat Screen</title>
      </Helmet>
      <Box
        ref={ref}
        component="div"
        onKeyDown={(event) => {
          esckey(event);
        }}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "Poppins, sans-serif",
          borderRadius: "30px",
          bgcolor: bg_color,
          width: "content-fit",
          p: "0px 6px 0px 0px",
          m: 0,
        }}
      >
        <SideBar />
        <Box
          sx={{
            bgcolor: chatColor,
            display: "flex",
            justifyContent: "space-between",
            p: "5px 1px 5px 5px",
            borderRadius: "32px",
          }}
        >
          <Box sx={{ p: "12px 5px 12px 12px", height: "625Px" }}>
            <Box className="chat-list" sx={{ m: 2, bgcolor: "#202329" }}>
              <SearchBar
                val={inputSearch}
                onChange={(e) => {
                  setInputSearch(e.target.value);
                }}
              />
            </Box>
            {chatContact && (
              <Box
                sx={{
                  animation:
                    "slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
                  maxHeight: "90%",
                  borderRadius: "4%",
                  overflowY: "scroll",
                  scrollBehavior: "smooth",
                  cursor: "auto",
                  p: "0 10px 0 5px",
                  "&::-webkit-scrollbar": {
                    width: "6px",
                    height: "6px",
                  },
                  "&::-webkit-scrollbar-track": {
                    borderRadius: "10px",
                    background: "transparent",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    borderRadius: "10px",
                    background: "transparent",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    background: highlight,
                  },
                  "&::-webkit-scrollbar-thumb:active": {
                    background: "rgba(0, 0, 0, 0.9)",
                  },
                }}
              >
                <ContactCardList
                  showChatOnly={selectedMenu}
                  data={
                    inputSearch === ""
                      ? selectedMenu === "contact"
                        ? contactList
                        : chatContact
                      : searchContact
                  }
                />
              </Box>
            )}
          </Box>
          <Box
            className="chat-screen"
            sx={{
              visibility: sender?.uid?.length > 0 ? "visible" : "hidden",
              color: text_color,
              width: "600px",
              display: "flex",
              justifyContent: "space-between",
              verticalAlign: "middle",
              pt: 2,
              pr: 2,
              pl: 2,
            }}
          >
            <Box>
              <Box sx={{ color: textHeading }}>{sender?.displayName}</Box>
              <Box component="p" sx={{ fontSize: "10px" }}>
                {sender?.status ? "Not Active" : "Online"}
              </Box>
              <Box
                ref={containerRef}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: "600px",
                  position: "fixed",
                  maxHeight: "78%",
                  pt: "10px",
                  overflowY: "scroll",
                  scrollBehavior: "smooth",
                
                  "&::-webkit-scrollbar": {
                    width: "6px",
                    height: "6px",
                  },
                  "&::-webkit-scrollbar-track": {
                    borderRadius: "10px",
                    background: "rgba(0, 0, 0, 0.1)",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    borderRadius: "10px",
                    background: "rgba(0,0,0,0.2)",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    background: highlight,
                  },
                  "&::-webkit-scrollbar-thumb:active": {
                    background: "rgba(0, 0, 0, 0.9)",
                  },
                }}
              >
                {userChat?.length === 0 ? (
                  <>
                    <Box
                      sx={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        maxWidth: "60%",
                        background: "#6b8afdd4",
                        borderRadius: "12px",
                        m: "35px 0% 0 14%",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          color: textHeading,
                          fontWeight: "400",
                          fontSize: "12px",
                          m: "1px 7px 1px 7px",
                          p: "1.5px 2px 1.5px 2px",
                        }}
                      >
                        You and{" "}
                        <span style={{ color: "blue", fontWeight: "600" }}>
                          {sender?.displayName}
                        </span>{" "}
                        don't have any Coversation yet..!!!
                      </Typography>
                    </Box>{" "}
                    <img
                      src={require("../../Images/Young_man.png")}
                      alt=""
                      width="590px"
                    />
                  </>
                ) : (
                  <Chat />
                )}
                <Box
                  sx={{
                    position: "fixed",
                    top: "90%",
                    width: "600px",
                    display: "flex",
                    flexDirection: "row",
                    height: "46px",
                  }}
                >
                  <MessageInput
                    placeHolder="Type your message here..!!!"
                    val={text}
                    sendBtn={false}
                    onChange={(e) => setText(e.target.value)}
                  />
                  {/* this is for image upload */}
                  <MoreOption />
                  {imgFile ? <PhotoPreview /> : null}
                  <IconButton sx={{ color: text_color, ml: "79px" }}>
                    <BiMicrophone />
                  </IconButton>
                  <IconButton sx={{ color: text_color, ml: 0 }}>
                    <HiOutlineVideoCamera />
                  </IconButton>
                  <IconButton
                    sx={{ color: text_color }}
                    onClick={text === "" ? null : handleSent}
                  >
                    <AiOutlineSend />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <Box sx={{ cursor: "pointer", color: iconColor, pt: 1 }}>
              <Box component="span" sx={{ m: 1.5 }}>
                <FiSearch size={20} />
              </Box>
              <Box component="span" sx={{ m: 1.5 }}>
                <IoCall size={20} />
              </Box>
              <Box component="span" sx={{ m: 1.5 }}>
                <BsReverseLayoutSidebarReverse size={20} />
              </Box>
              <Box component="span" sx={{ m: 1.5 }}>
                <CgMoreVertical size={20} />
              </Box>
            </Box>
          </Box>
        </Box>
        {/*Profile Details Card */}
        {currentUser?.uid && (
          <ProfileDetails
            sender={sender?.uid?.length > 0 ? sender : currentUser}
          />
        )}
      </Box>
    </>
  );
};
export default ChatScreen;
