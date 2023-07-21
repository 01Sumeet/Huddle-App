import {
  Box,
  List,
  ListItem,
  ListItemButton,
  Avatar,
  Typography,
  IconButton,
  Paper,
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import { HiChatAlt2, HiFolder, HiOutlineVideoCamera } from "react-icons/hi";
import { BiMicrophone } from "react-icons/bi";
import { AiOutlineSend } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { BsReverseLayoutSidebarReverse } from "react-icons/bs";
import { SiGooglemeet } from "react-icons/si";
import { IoCalendar, IoSettingsSharp, IoCall } from "react-icons/io5";
import { MdAnalytics, MdBookmarks } from "react-icons/md";
import { CgMoreVertical } from "react-icons/cg";
import { Helmet } from "react-helmet";
import "./Chat.css";
import CustomizedInputBase from "../Assets/SearchBar/SearchBar";
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
import { useAuthContext } from "../Context/authContext";
import Chat from "../ChatScreenComponents/ChatLogic";
import { useContactListContext } from "../Context/ContactListContext";
import ContactCardList from "../ChatScreenComponents/ContactList/ContactList";

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
  const [text, setText] = useState("");
  const [inputSearch, setInputSearch] = useState("");

  const [cont, setAllCont] = useState(false);
  const container = containerRef.current;
  const Change = userChat[0]?.messages?.length;
  // this is for chat default scroll to latest chat
  useEffect(() => {
    const scrollToLastElement = () => {
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    };
    scrollToLastElement();
  }, [container, text, Change]);
  // serach
  const searchContact = useMemo(() => {
    const data = contactList?.filter((user) => {
      return user.displayName
        .toLowerCase()
        .includes(inputSearch?.toLowerCase());
    });
    return data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputSearch]);
  const icons = [
    <HiChatAlt2 size={22} onClick={() => setAllCont(cont ? false : true)} />,
    <HiFolder size={20} onClick={() => setAllCont(true)} />,
    <SiGooglemeet size={20} />,
    <IoCalendar size={20} />,
    <MdAnalytics size={20} />,
    <MdBookmarks size={20} />,
    <IoSettingsSharp size={20} style={{ paddingTop: "auto" }} />,
  ];

  // sent msg
  const handleSent = async () => {
    const combinedId =
      currentUser.uid > sender?.uid
        ? currentUser.uid + sender?.uid
        : sender?.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        debugger;

        // here we update chat between two user
        await updateDoc(doc(db, "chats", combinedId), {
          messages: arrayUnion({
            id: uuidv4(),
            text: text,
            senderId: currentUser?.uid,
            date: Timestamp.now(),
          }),
        });
        setText("");
        // for recent chats
        await setDoc(doc(db, "userChats", sender?.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        // for recent chats
        await setDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: sender?.uid,
            displayName: sender.displayName,
            photoURL: sender.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        // here we update last messages
        await updateDoc(doc(db, "userChats", currentUser?.uid), {
          [combinedId]: {
            lastMessage: text,
          },
          date: serverTimestamp(),
        });
        // here we update for second user
        await updateDoc(doc(db, "userChats", sender?.uid), {
          [combinedId]: {
            lastMessage: text,
          },
          date: serverTimestamp(),
        });
      } else {
        // here we update chat between two user
        await updateDoc(doc(db, "chats", combinedId), {
          messages: arrayUnion({
            id: uuidv4(),
            text: text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });

        // here we update last messages
        await updateDoc(doc(db, "userChats", currentUser?.uid), {
          [combinedId]: {
            lastMessage: text,
          },
          date: serverTimestamp(),
        });
        // here we update for second user
        await updateDoc(doc(db, "userChats", sender?.uid), {
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
  const handleKey = (e) => {
    e.preventDefault();
    console.log(e);
    e.code === "Enter" && handleSent();
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Chat Screen</title>
      </Helmet>
      <Box
        component="div"
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
        <Box className="Side-bar" sx={{ height: "92vh" }}>
          <Box
            sx={{
              bgcolor: "transparent",
              height: "96.5%",
            }}
          >
            <Avatar
              src={require("../Images/normal Full Logo.png")}
              sx={{ borderRadius: "12px", ml: "auto", mr: "auto", mt: 2 }}
            />
            <List sx={{ fontSize: "11px" }}>
              {[
                "Chats",
                "Contacts",
                "Meet",
                "Calendar",
                "Rating",
                "Saved",
                "Setting",
              ].map((text, index) => (
                <ListItem key={text} disablePadding sx={{ color: text_color }}>
                  <ListItemButton sx={{ display: "initial" }}>
                    <ListItemIcon
                      sx={{
                        color: text_color,
                        display: "contents",
                        textAlign: "center",
                      }}
                    >
                      {icons[index]}
                      <div>{text}</div>
                    </ListItemIcon>{" "}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
        <Box
          sx={{
            bgcolor: chatColor,
            display: "flex",
            justifyContent: "space-between",
            p: "5px 1px 5px 5px",
            borderRadius: "32px",
          }}
        >
          <Box sx={{ p: "12px 5px 12px 12px" }}>
            <Box className="chat-list" sx={{ m: 2, bgcolor: "#202329" }}>
              <CustomizedInputBase
                placeHolder="Search"
                width="250px"
                val={inputSearch}
                onChange={(e) => {
                  setInputSearch(e.target.value);
                  setAllCont(false);
                }}
              />
            </Box>
            <Box
              sx={{
                maxHeight: "492.5px",
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
              <ContactCardList
                data={inputSearch === "" ? contactList : searchContact}
                // onClick={handleSelect(data.uid)}
              />
            </Box>
          </Box>
          <Box
            className="chat-screen"
            sx={{
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
                <Chat />
                <Box
                  sx={{
                    position: "fixed",
                    top: "90%",
                    width: "600px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <CustomizedInputBase
                    width="460px"
                    placeHolder="Type your message here..!!!"
                    val={text}
                    onChange={(e) => setText(e.target.value)}

                    // val={}
                  />
                  <IconButton sx={{ color: text_color, ml: 1.3 }}>
                    <BiMicrophone />
                  </IconButton>
                  <IconButton sx={{ color: text_color, ml: 0 }}>
                    <HiOutlineVideoCamera />
                  </IconButton>
                  <IconButton
                    sx={{ color: text_color }}
                    onClick={handleSent}
                    onKeyDown={(e) => handleKey(e)}
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
        <Box
          sx={{
            width: "150px",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            p: "18px 10px 17px 15px",
          }}
          className="Profile-detail"
        >
          <Box sx={{ color: textHeading, fontWeight: "300", fontSize: "14px" }}>
            <Box>Profile Details</Box>
          </Box>
          <Paper
            elevation={10}
            sx={{
              height: "fit-content",
              bgcolor: highlight,
              textAlign: "center",
              m: "12px 0px 10px 0px ",
              borderRadius: "12px",
              p: 1,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Paper
                elevation={3}
                sx={{
                  // bgcolor: myArray[index],
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                }}
              >
                <img
                  src={sender?.photoURL}
                  alt="profile"
                  height="65px"
                  width="65px"
                  style={{
                    marginBottom: "-7px",
                    filter: "drop-shadow(7px 6px 8px #131313)",
                  }}
                />
              </Paper>
            </Box>
            <Typography
              sx={{
                m: "5px 0 5px 0",
                fontFamily: "Poppins, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                color: textHeading,
              }}
            >
              {sender?.displayName}
            </Typography>
            <Typography
              component="p"
              sx={{
                fontSize: "9px",
                color: textHeading,
                fontWeight: "300",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Online
            </Typography>
          </Paper>
        </Box>
      </Box>
    </>
  );
};
export default ChatScreen;
