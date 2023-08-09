import { Box, Paper, Typography } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "../../Animation/Animation.css";

const time_stamp = "#656769";
const chat_font = "#F1F2F5";

const MessageBoxLeft = (msg) => {
  const convertUnixTimestampToTime = (unixTimestamp) => {
    const dateObj = new Date(unixTimestamp * 1000);
    return dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const unixTimestamp = msg?.data?.date.seconds;
  const formattedTime = convertUnixTimestampToTime(unixTimestamp);
  const myArray = ["#ffcda5", "#4aac67", "#A9D2FD", "#ffe5a5", "#cd413c"];

  return (
    <>
      <Box
        sx={{ bgcolor: "transparent", m: 0.5, outline: "none" }}
        key={msg?.data?.id}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            elevation={10}
            sx={{
              bgcolor: myArray[2],
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "60px",
              height: "60px",
              m: "auto 8px 0px 2px",
            }}
          >
            <img src={msg?.sender?.photoURL} alt="" width="60px" />
          </Box>
          <Paper
            elevation={10}
            sx={{
              animation:
                "scale-up-hor-left 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
              backfaceVisibility: "hidden",
              bgcolor: "#2E343D",
              maxWidth: "333px",
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
                  color: "#f1f2f5b0",
                }}
              >
                {msg?.sender?.displayName}
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
                {formattedTime}
              </Typography>
            </Box>
            {msg?.data?.image && (
              <Box>
                <img
                  src={msg?.data?.image}
                  alt=""
                  style={{
                    maxWidth: "300px",
                    maxHeight: "250px",
                    borderRadius: "16px",
                  }}
                />
              </Box>
            )}
            <Typography
              sx={{
                fontSize: "13px",
                fontFamily: "Poppins, sans-serif",
                color: "#cfcfcf",
                lineHeight: "1.2",
                fontWeight: "300",
                pt: 1,
              }}
            >
              {msg?.data?.text}
            </Typography>
            <Box
              sx={{
                float: "right",
                color: "#656769",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              <VisibilityOffIcon sx={{ mb: "-5.5px", fontSize: "18.5px" }} />
              <Typography
                component="span"
                sx={{
                  mr: 1,
                  fontSize: "13px",
                  fontFamily: "Poppins, sans-serif",
                }}
              ></Typography>
              <Typography
                component="span"
                sx={{ fontSize: "12px", fontFamily: "Poppins, sans-serif" }}
              >
                03:47AM
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};
export default MessageBoxLeft;
