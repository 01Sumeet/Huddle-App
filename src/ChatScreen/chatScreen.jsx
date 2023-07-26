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
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Timestamp,
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useUserChat } from "../Context/UserChatContext";
import { db } from "../Firebase/firebaseConfig";
import { useAuthContext } from "../Context/AuthContext";
import Chat from "../ChatScreenComponents/ChatLogic";
import { useContactListContext } from "../Context/ContactListContext";
import ContactCardList from "../ChatScreenComponents/ContactList/ContactList";
import SideBar from "../Assets/SideBar/SideBar";
import { useGetUserStatus } from "../Hooks/UserStatus/useGetUserStatus";
import SearchBar from "../Assets/SearchBar/SearchBar";
import ProfileDetails from "../ChatScreenComponents/ProfileDetails/ProfileDetails";

const bg_color = "#131313";
//const bg_up_color = "#2e343d";
const highlight = "#6b8afd";
const text_color = "#a9aeba";
const chatColor = "#202329";
const iconColor = "#848599";
const textHeading = "#FEFEFF";

const ChatScreen = () => {
  const containerRef = useRef(null);
  const { contactList } = useContactListContext();
  const { currentUser } = useAuthContext();
  const { sender, userChat } = useUserChat();
  const { isOnline } = useGetUserStatus();
  const [text, setText] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const container = containerRef.current;
  const Change = userChat?.messages?.length;
  const ref = useRef(null);

  // 👇️ check if an element is focused on mount
  useEffect(() => {
    if (document.activeElement === ref.current) {
      console.log("element has focus");
    } else {
      console.log("element does NOT have focus");
    }
  }, []);

  // this is for chat default scroll to latest chat
  useEffect(() => {
    const scrollToLastElement = () => {
      if (container) {
        container.scrollTop = container.scrollHeight;
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
      handleSent();
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
      currentUser.uid > sender?.uid
        ? currentUser.uid + sender?.uid
        : sender?.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        setDoc(doc(db, "chats", combinedId), { messages: [] });

        // here we update chat between two user
        updateDoc(doc(db, "chats", combinedId), {
          messages: arrayUnion({
            id: uuidv4(),
            text: text,
            senderId: currentUser?.uid,
            date: Timestamp.now(),
          }),
        });
        setText("");

        // for recent chats
        setDoc(doc(db, "userChats", sender?.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        // for recent chats
        setDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: sender?.uid,
            displayName: sender.displayName,
            photoURL: sender.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        // here we update last messages
        updateDoc(doc(db, "userChats", currentUser?.uid), {
          [combinedId]: {
            lastMessage: text,
          },
          date: serverTimestamp(),
        });

        // here we update for second user
        updateDoc(doc(db, "userChats", sender?.uid), {
          [combinedId]: {
            lastMessage: text,
          },
          date: serverTimestamp(),
        });
      } else {
        // here we update chat between two user
        updateDoc(doc(db, "chats", combinedId), {
          messages: arrayUnion({
            id: uuidv4(),
            text: text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });

        // here we update last messages
        updateDoc(doc(db, "userChats", currentUser?.uid), {
          [combinedId]: {
            lastMessage: text,
          },
          date: serverTimestamp(),
        });

        // here we update for second user
        updateDoc(doc(db, "userChats", sender?.uid), {
          [combinedId]: {
            lastMessage: text,
          },
          date: serverTimestamp(),
        });
      }

      setText("");
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
          p: "0px 10px 0px 0px",
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
                placeHolder="Search"
                width="250px"
                val={inputSearch}
                onChange={(e) => {
                  setInputSearch(e.target.value);
                }}
                keyBoardEvent={(e) => esckey(e)}
              />
            </Box>
            <Box
              sx={{
                maxHeight: "90%",
                borderRadius: "4%",
                overflowY: "scroll",
                scrollBehavior: "smooth",
                cursor: "auto",
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
                data={inputSearch === "" ? contactList : searchContact}
                // onClick={handleSelect(data.uid)}
              />
            </Box>
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
                {/* 42 Members, 10 Online */}
                Online
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
                  cursor: "auto",
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
                {/* {userChat?.messages?.length < 0 ? ( */}
                {userChat?.length === 0 ? (
                  <>
                    <Box
                      sx={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        width: "fit-content",
                        background: highlight,
                        borderRadius: "12px",
                        m: "10px 15% 0 15%",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          color: textHeading,
                          fontWeight: "400",
                          fontSize: "14px",
                          m: "2px 16px 2px 16px",
                          p: "9px",
                        }}
                      >
                        You and{" "}
                        <span style={{ color: "blue", fontWeight: "600" }}>
                          {sender?.displayName}
                        </span>{" "}
                        don't have any Coversation Yet
                      </Typography>
                    </Box>{" "}
                    <img
                      src={require("../Images/Young_man.png")}
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
                  }}
                >
                  <SearchBar
                    width="460px"
                    placeHolder="Type your message here..!!!"
                    val={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <IconButton sx={{ color: text_color, ml: 1.3 }}>
                    <BiMicrophone />
                  </IconButton>
                  <IconButton sx={{ color: text_color, ml: 0 }}>
                    <HiOutlineVideoCamera />
                  </IconButton>
                  <IconButton
                    sx={{ color: text_color }}
                    onClick={text === "" ? null : handleSent}
                    // onKeyDown={(e) => handleKey(e)}
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
        <ProfileDetails
          sender={sender?.uid?.length > 0 ? sender : currentUser}
        />
      </Box>
    </>
  );
};
export default ChatScreen;
