import {
  Box,
  Card,
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
import {
  BsReverseLayoutSidebarReverse,
 
} from "react-icons/bs";
import { SiGooglemeet } from "react-icons/si";
import { IoCalendar, IoSettingsSharp, IoCall } from "react-icons/io5";
import { MdAnalytics, MdBookmarks } from "react-icons/md";
import { CgMoreVertical } from "react-icons/cg";
import { Helmet } from "react-helmet";
import "./Chat.css";
import CustomizedInputBase from "../Assets/SearchBar/SearchBar";
import { getDatabase } from "firebase/database";

import ContactList from "../ChatScreenComponents/ContactList/ContactList";
import MessageBoxLeft from "../ChatScreenComponents/MessageBox/MessageBoxLeft";
import MessageBoxRight from "../ChatScreenComponents/MessageBox/MessageBoxRight";
const database = getDatabase();
// const useStyles = makeStyles((theme) => ({
//   columnContainer: {
//     display: "flex",
//     flexDirection: "column",
//   },
// }));
const bg_color = "#131313";
const bg_up_color = "#2e343d";
const highlight = "#6b8afd";
const text_color = "#a9aeba";
const chatColor = "#202329";
const iconColor = "#848599";
const textHeading = "#FEFEFF";
const ChatScreen = () => {
  const icons = [
    <HiChatAlt2 size={22} />,
    <HiFolder size={20} />,
    <SiGooglemeet size={20} />,
    <IoCalendar size={20} />,
    <MdAnalytics size={20} />,
    <MdBookmarks size={20} />,
    <IoSettingsSharp size={20} className="setting" />,
  ];
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
          <Card
            sx={{
              bgcolor: "transparent",
              height: "96.5%",
            }}
          >
            {/* <Typography
              variant="h1"
              sx={{
                fontSize: "25px",
                color: "#A9AEBA",
                fontWeight: "600",
                textAlign: "center",
                mt: 3,
              }}
              gutterBottom
            >
              HA
            </Typography> */}

            <Avatar
              src={require("../Images/normal Full Logo.png")}
              sx={{ borderRadius: "12px", ml: "auto", mr: "auto",mt:2 }}
            />

            <List sx={{ fontSize: "11px" }}>
              {[
                "All Chats",
                "Work",
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
          </Card>
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
              <CustomizedInputBase placeHolder="Search" width="250px" value />
            </Box>
            <Box>
              <ContactList />
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
              <Box sx={{ color: textHeading }}>Office Chat</Box>
              <Box component="p" sx={{ fontSize: "10px" }}>
                42 Members, 10 Online
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: "600px",
                  position: "fixed",
                  minHeight: "88%",
                  pt: "10px",
                }}
              >
                <Box className="right-message" sx={{ bgcolor: "", mt: 0.5 }}>
                  <MessageBoxLeft />
                </Box>
                <Box className="left-message" sx={{ bgcolor: "", mt: 0.5 }}>
                  <MessageBoxRight />
                </Box>

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
                  />
                  <IconButton sx={{ color: text_color, ml: 1.3 }}>
                    <BiMicrophone />
                  </IconButton>
                  <IconButton sx={{ color: text_color, ml: 0 }}>
                    <HiOutlineVideoCamera />
                  </IconButton>
                  <IconButton sx={{ color: text_color }}>
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
            <Box>
              <Avatar sx={{ m: "5% 50% 5% 36%" }}></Avatar>
            </Box>
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                color: textHeading,
              }}
            >
              Testing User
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
