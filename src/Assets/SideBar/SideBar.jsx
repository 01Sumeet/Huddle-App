import { Box, List, ListItem, ListItemButton, Avatar } from "@mui/material";
import { HiChatAlt2, HiFolder } from "react-icons/hi";
import { SiGooglemeet } from "react-icons/si";
import { IoCalendar, IoSettingsSharp } from "react-icons/io5";
import { MdAnalytics, MdBookmarks } from "react-icons/md";
import ListItemIcon from "@mui/material/ListItemIcon";
const text_color = "#a9aeba";



const SideBar = () => {
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
          <List sx={{ fontSize: "11px" }}>
            <ListItem disablePadding sx={{ color: text_color }}>
              <ListItemButton sx={{ display: "initial" }}>
                <ListItemIcon
                  sx={{
                    color: text_color,
                    display: "contents",
                    textAlign: "center",
                  }}
                >
                  <HiChatAlt2 size={22} />
                  <div>Chats</div>
                </ListItemIcon>{" "}
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ color: text_color }}>
              <ListItemButton sx={{ display: "initial" }}>
                <ListItemIcon
                  sx={{
                    color: text_color,
                    display: "contents",
                    textAlign: "center",
                  }}
                >
                  <HiFolder size={20} />
                  <div>Contacts</div>
                </ListItemIcon>{" "}
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ color: text_color }}>
              <ListItemButton sx={{ display: "initial" }}>
                <ListItemIcon
                  sx={{
                    color: text_color,
                    display: "contents",
                    textAlign: "center",
                  }}
                >
                  <SiGooglemeet size={20} />
                  <div>Meet</div>
                </ListItemIcon>{" "}
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ color: text_color }}>
              <ListItemButton sx={{ display: "initial" }}>
                <ListItemIcon
                  sx={{
                    color: text_color,
                    display: "contents",
                    textAlign: "center",
                  }}
                >
                  <IoCalendar size={20} />
                  <div>Calendar</div>
                </ListItemIcon>{" "}
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ color: text_color }}>
              <ListItemButton sx={{ display: "initial" }}>
                <ListItemIcon
                  sx={{
                    color: text_color,
                    display: "contents",
                    textAlign: "center",
                  }}
                >
                  <MdAnalytics size={20} />
                  <div>Rating</div>
                </ListItemIcon>{" "}
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ color: text_color }}>
              <ListItemButton sx={{ display: "initial" }}>
                <ListItemIcon
                  sx={{
                    color: text_color,
                    display: "contents",
                    textAlign: "center",
                  }}
                >
                  <MdBookmarks size={20} />
                  <div>Saved</div>
                </ListItemIcon>{" "}
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ color: text_color }}>
              <ListItemButton sx={{ display: "initial" }}>
                <ListItemIcon
                  sx={{
                    color: text_color,
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
