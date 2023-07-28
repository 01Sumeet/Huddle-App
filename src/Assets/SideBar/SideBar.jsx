import { Box, List, ListItem, ListItemButton, Avatar } from "@mui/material";
import { HiChatAlt2, HiFolder } from "react-icons/hi";
import { SiGooglemeet } from "react-icons/si";
import { IoCalendar, IoSettingsSharp } from "react-icons/io5";
import { MdAnalytics, MdBookmarks } from "react-icons/md";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelectedMenu } from "../../Context/SelectedMenu";
const text_color = "#a9aeba";

const SideBar = () => {
  const { setSelectedMenu, selectedMenu } = useSelectedMenu();
  const [selectedButton, setSelectedButton] = useState("chats");
  const navigate = useNavigate();

  const handleButtonClick = (button, takeRoute) => {
    setSelectedButton(button);
    setSelectedMenu(button);
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
            sx={{
              borderRadius: "12px",
              ml: "auto",
              mr: "auto",
              mt: 2,
              filter: "drop-shadow(1px 3px 10px #572ae7)",
            }}
          />
          <List sx={{ fontSize: "11px", height: "89%" }}>
            <ListItem
              onClick={() => handleButtonClick("chats")}
              sx={{ bgcolor: selectedButton === "chats" ? "#6b8afd29" : "" }}
              disablePadding
            >
              <ListItemButton sx={{ display: "initial" }}>
                <ListItemIcon
                  sx={{
                    color: selectedButton === "chats" ? "#fff" : text_color,
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
              onClick={() => handleButtonClick("contact")}
              sx={{ bgcolor: selectedButton === "contact" ? "#6b8afd29" : "" }}
              disablePadding
            >
              <ListItemButton sx={{ display: "initial" }}>
                <ListItemIcon
                  sx={{
                    color: selectedButton === "contact" ? "#fff" : text_color,
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
              onClick={() => handleButtonClick("meet")}
              disablePadding
              sx={{ bgcolor: selectedButton === "meet" ? "#6b8afd29" : "" }}
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
              onClick={() => handleButtonClick("meet")}
              disablePadding
              sx={{ bgcolor: selectedButton === "meet" ? "#6b8afd29" : "" }}
            >
              <ListItemButton sx={{ display: "initial" }}>
                <ListItemIcon
                  sx={{
                    color: selectedButton === "meet" ? "#fff" : text_color,
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
              onClick={() => handleButtonClick("calendar")}
              disablePadding
              sx={{ bgcolor: selectedButton === "calendar" ? "#6b8afd29" : "" }}
            >
              <ListItemButton sx={{ display: "initial" }}>
                <ListItemIcon
                  sx={{
                    color: selectedButton === "calendar" ? "#fff" : text_color,
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
              onClick={() => handleButtonClick("rating")}
              disablePadding
              sx={{ bgcolor: selectedButton === "rating" ? "#6b8afd29" : "" }}
            >
              <ListItemButton sx={{ display: "initial" }}>
                <ListItemIcon
                  sx={{
                    color: selectedButton === "rating" ? "#fff" : text_color,
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
              onClick={() => handleButtonClick("saved")}
              disablePadding
              sx={{ bgcolor: selectedButton === "saved" ? "#6b8afd29" : "" }}
            >
              <ListItemButton sx={{ display: "initial" }}>
                <ListItemIcon
                  sx={{
                    color: selectedButton === "saved" ? "#fff" : text_color,
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
