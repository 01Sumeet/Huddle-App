import {
  Container,
  Box,
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
  Typography,
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import { HiChatAlt2, HiFolder } from "react-icons/hi";
import { SiGooglemeet } from "react-icons/si";
import { IoCalendar, IoSettingsSharp } from "react-icons/io5";
import { MdAnalytics, MdBookmarks } from "react-icons/md";
import "./Chat.css";
// const useStyles = makeStyles((theme) => ({
//   columnContainer: {
//     display: "flex",
//     flexDirection: "column",
//   },
// }));
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
      <Container
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "Poppins, sans-serif",
          borderRadius: "30px",
        }}
      >
        <Box sx={{ bgcolor: "#131313", height: "90vh", width: "content-fit" }}>
          <Card
            sx={{
              bgcolor: "#131313",
              borderRadius: "25px",
              
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: "25px",
                color: "#a9aeba",
                fontWeight: "600",
               textAlign:"center",
                mt: 3,
              }}
              gutterBottom
            >
              HA
            </Typography>
            {/* <Avatar
              src={require("../Images/normal Full Logo.png")}
              sx={{ borderRadius: "12px", m: 1 }}
            /> */}

            <List>
              {[
                "All Chats",
                "Work",
                "Meet",
                "Calendar",
                "Rating",
                "Saved",
                "Setting",
              ].map((text, index) => (
                <ListItem key={text} disablePadding sx={{ color: "#a9aeba" }}>
                  <ListItemButton sx={{ display: "initial" }}>
                    <ListItemIcon
                      sx={{ color: "#a9aeba", display: "contents" , textAlign:"center" }}
                    >
                      {icons[index]}
                      <div>{text}</div>
                    </ListItemIcon>{" "}
                    {/* <ListItemText
                      primary={text}
                      sx={{ fontFamily: "Poppins, sans-serif" }}
                    /> */}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Card>
        </Box>
        <Box sx={{ bgcolor: "white" }}>Chat list</Box>
        <Box sx={{ bgcolor: "blue" }}>Chat Screen</Box>
      </Container>
    </>
  );
};
export default ChatScreen;
