import { Box, List, ListItem, ListItemButton, Avatar } from "@mui/material";
import { HiChatAlt2, HiFolder } from "react-icons/hi";
import { SiGooglemeet } from "react-icons/si";
import { IoCalendar, IoSettingsSharp } from "react-icons/io5";
import { MdAnalytics, MdBookmarks } from "react-icons/md";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useState } from "react";
const text_color = "#a9aeba";

const SideBar = () => {
  const [selectedButton, setSelectedButton] = useState("button1");

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  return (
    <>
      <Box className="Side-bar" sx={{ height: "92vh" }}>
        <Box
          sx={{
            bgcolor: "transparent",
            height: "96.5%",
          }}
        >
          <Avatar
            src={require("../../Images/normal Full Logo.png")}
            sx={{ borderRadius: "12px", ml: "auto", mr: "auto", mt: 2 }}
          />
          <List sx={{ fontSize: "11px", height: "89%" }}>
            <ListItem
              onClick={() => handleButtonClick("button1")}
              sx={{ bgcolor: selectedButton === "button1" ? "#6b8afd29" : "" }}
              disablePadding
            >
              <ListItemButton sx={{ display: "initial" }}>
                <ListItemIcon
                  sx={{
                    color: selectedButton === "button1" ? "#fff" : text_color,
                    display: "contents",
                    textAlign: "center",
                  }}
                >
                  <HiChatAlt2 size={22} />
                  <div>Chats</div>
                </ListItemIcon>{" "}
              </ListItemButton>
            </ListItem>
            <ListItem
              onClick={() => handleButtonClick("button2")}
              sx={{ bgcolor: selectedButton === "button2" ? "#6b8afd29" : "" }}
              disablePadding
            >
              <ListItemButton sx={{ display: "initial" }}>
                <ListItemIcon
                  sx={{
                    color: selectedButton === "button2" ? "#fff" : text_color,
                    display: "contents",
                    textAlign: "center",
                  }}
                >
                  <HiFolder size={20} />
                  <div>Contacts</div>
                </ListItemIcon>{" "}
              </ListItemButton>
            </ListItem>
            <ListItem
              onClick={() => handleButtonClick("button3")}
              disablePadding
              sx={{ bgcolor: selectedButton === "button3" ? "#6b8afd29" : "" }}
            >
              <ListItemButton sx={{ display: "initial" }}>
                <ListItemIcon
                  sx={{
                    color: selectedButton === "button3" ? "#fff" : text_color,
                    display: "contents",
                    textAlign: "center",
                  }}
                >
                  <SiGooglemeet size={20} />
                  <div>Meet</div>
                </ListItemIcon>{" "}
              </ListItemButton>
            </ListItem>
            <ListItem
              onClick={() => handleButtonClick("button4")}
              disablePadding
              sx={{ bgcolor: selectedButton === "button4" ? "#6b8afd29" : "" }}
            >
              <ListItemButton sx={{ display: "initial" }}>
                <ListItemIcon
                  sx={{
                    color: selectedButton === "button4" ? "#fff" : text_color,
                    display: "contents",
                    textAlign: "center",
                  }}
                >
                  <IoCalendar size={20} />
                  <div>Calendar</div>
                </ListItemIcon>{" "}
              </ListItemButton>
            </ListItem>
            <ListItem
              onClick={() => handleButtonClick("button5")}
              disablePadding
              sx={{ bgcolor: selectedButton === "button5" ? "#6b8afd29" : "" }}
            >
              <ListItemButton sx={{ display: "initial" }}>
                <ListItemIcon
                  sx={{
                    color: selectedButton === "button5" ? "#fff" : text_color,
                    display: "contents",
                    textAlign: "center",
                  }}
                >
                  <MdAnalytics size={20} />
                  <div>Rating</div>
                </ListItemIcon>{" "}
              </ListItemButton>
            </ListItem>
            <ListItem
              onClick={() => handleButtonClick("button6")}
              disablePadding
              sx={{ bgcolor: selectedButton === "button6" ? "#6b8afd29" : "" }}
            >
              <ListItemButton sx={{ display: "initial" }}>
                <ListItemIcon
                  sx={{
                    color: selectedButton === "button6" ? "#fff" : text_color,
                    display: "contents",
                    textAlign: "center",
                  }}
                >
                  <MdBookmarks size={20} />
                  <div>Saved</div>
                </ListItemIcon>{" "}
              </ListItemButton>
            </ListItem>
            <ListItem
              onClick={() => handleButtonClick("button7")}
              disablePadding
              sx={{ bgcolor: selectedButton === "button7" ? "#6b8afd29" : "" }}
            >
              <ListItemButton sx={{ display: "initial" }}>
                <ListItemIcon
                  sx={{
                    color: selectedButton === "button7" ? "#fff" : text_color,
                    display: "contents",
                    textAlign: "center",
                  }}
                >
                  <IoSettingsSharp size={20} />
                  <div>Setting</div>
                </ListItemIcon>{" "}
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    </>
  );
};

export default SideBar;
