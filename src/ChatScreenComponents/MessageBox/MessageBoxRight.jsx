import { Box, Paper, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/authContext";
const time_stamp = "#656769";
const chat_font = "#F1F2F5";

const MessageBoxRight = (msg) => {
  const { currentUser } = useContext(AuthContext);

  const myArray = ["#ffcda5", "#4aac67", "#A9D2FD", "#ffe5a5", "#cd413c"];
  return (
    <>
      <Box
        sx={{ bgcolor: "transparent", m: 0.5, outline: "none" }}
        // key={msg.data.time_stamp}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            // justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <Paper
            elevation={10}
            sx={{
              bgcolor: "#2E343D",
              maxWidth: "260px",
              minWidth: "160px",
              p: "14px 14px 11px 16px",
              borderRadius: "20px",
            }}
          >
            <Box>
              <Typography
                component="span"
                sx={{
                  fontSize: "16px",
                  fontFamily: "Poppins, sans-serif",
                  color: chat_font,
                }}
              >
                {/* {msg.data.userName} */}
              </Typography>
              <Typography
                component="span"
                sx={{
                  float: "right",
                  color: time_stamp,
                  fontFamily: "Poppins,sans-serif",
                  fontSize: "12px",
                }}
              >
                11:03PM
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "13px",
                fontFamily: "Poppins, sans-serif",
                color: "#cfcfcf",
                lineHeight: "1.2",
                fontWeight: "300",
                pt: 1,
                // minHeight: "58px",
              }}
            >
              {/* {msg.data.message} */}
            </Typography>
            <Box
              sx={{
                float: "right",
                color: "#959597",

                fontFamily: "Poppins, sans-serif",
              }}
            >
              <VisibilityIcon sx={{ mb: "-5.5px", fontSize: "20.5px" }} />{" "}
              <Typography
                component="span"
                sx={{
                  mr: 1,
                  fontSize: "13px",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                3
              </Typography>
              <Typography
                component="span"
                sx={{ fontSize: "13px", fontFamily: "Poppins, sans-serif" }}
              >
                03:47AM
              </Typography>
            </Box>
          </Paper>
          <Box
            elevation={10}
            sx={{
              bgcolor: myArray[1],
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "60px",
              height: "60px",
              m: "auto 1px 0px 8px",
              // mt: "auto",
            }}
          >
            <img
              // src={require("../../Images/STK-20211103-WA0045__1_-removebg-preview.png")}
              src={currentUser?.photoURL}
              alt="Profile"
              width="60px"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default MessageBoxRight;
