import { Box, Paper, Typography } from "@mui/material";
import { BsFillPinAngleFill } from "react-icons/bs";
import { useUserChat } from "../../Context/UserChatContext";
import { useState } from "react";

const text_color = "#a9aeba";
const textHeading = "#FEFEFF";

const ContactCardList = (prop) => {
  const { setSender } = useUserChat();
  const [selectedContact, setSelectedContact] = useState();
  const myArray = [
    "#ffcda5",
    "#4aac67",
    "#A9D2FD",
    "#ffe5a5",
    "#cd413c",
    "#ffcda5",
    "#4aac67",
    "#A9D2FD",
    "#ffcda5",
    "#4aac67",
    "#A9D2FD",
    "#ffe5a5",
    "#cd413c",
    "#ffcda5",
    "#4aac67",
    "#A9D2FD",
  ];
  // console.log(prop);
  const handleSelect = (uid) => {
    setSender(uid);
    // console.log(uid);
  };

  // To make card selected
  const handleSelectedContact = (uid) => {
    setSelectedContact(uid);
    console.log("val", uid);
    // alert(uid);
  };

  console.log("prop.data", prop.data);
  return (
    <>
      {prop?.showChatOnly === "chats"
        ? prop.data?.map((data, index) => (
            <Paper
              onClick={() => {
                handleSelect(data.userInfo);
                handleSelectedContact(data.userInfo.uid);
              }}
              // onClick={() => showText("Hello")}
              key={index}
              // elevation={4}
              sx={{
                bgcolor: "#2e343d",
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "Poppins, sans-serif",
                height: "auto",
                p: "8px",
                mb: "8px",
                borderRadius: "20px",
                cursor: "pointer",
                boxShadow:
                  selectedContact === data.userInfo.uid
                    ? "0px 5px 12px -1px #5f81ffdb, 0px 72px 10px 0px rgba(0,0,0,0.14), 0px 7px 10px 6px rgba(0,0,0,0.12)"
                    : " 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);",
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  bgcolor: myArray[index],
                  borderRadius: "15px",
                }}
              >
                <img
                  src={data?.userInfo?.photoURL}
                  alt=""
                  height="60px"
                  width="65px"
                  style={{
                    marginBottom: "-7px",
                    filter: "drop-shadow(7px 6px 8px #131313)",
                  }}
                />
              </Paper>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "160px",
                  color: text_color,
                  fontFamily: "Poppins, sans-serif",
                  ml: "10px",
                }}
              >
                <Box sx={{ color: textHeading, fontSize: "14px" }}>
                  {data?.userInfo?.displayName}
                </Box>
                <Box sx={{ mt: "4px" }}>
                  <Typography
                    sx={{ fontSize: "11px", fontFamily: "Poppins, sans-serif" }}
                  >
                    {" "}
                    {data?.userLastMsg?.lastMessage}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  color: text_color,
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                <Box
                  sx={{
                    fontSize: "9px",
                    mb: "4px",
                    color: text_color,
                    mt: "4px",
                    mr: "2px",
                  }}
                >
                  12:59AM
                </Box>
                <Box
                  sx={{
                    bgcolor: "#6b8afd",
                    height: "19px",
                    width: "19px",
                    borderRadius: "50%",
                    textAlign: "center",
                    verticalAlign: "middle",
                    mb: "4px",
                    color: textHeading,
                  }}
                >
                  <Typography
                    sx={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
                  >
                    {" "}
                    2
                  </Typography>
                </Box>
                <Box sx={{ mb: "-4px" }}>
                  <BsFillPinAngleFill />
                </Box>
              </Box>
            </Paper>
          ))
        : prop.data?.map((data, index) => (
            <Paper
              onClick={() => {
                handleSelect(data);
                handleSelectedContact(data.uid);
              }}
              // onClick={() => showText("Hello")}
              key={index}
              // elevation={4}
              sx={{
                bgcolor: "#2e343d",
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "Poppins, sans-serif",
                height: "auto",
                p: "8px",
                mb: "8px",
                borderRadius: "20px",
                cursor: "pointer",
                boxShadow:
                  selectedContact === data?.uid
                    ? "0px 5px 12px -1px #5f81ffdb, 0px 72px 10px 0px rgba(0,0,0,0.14), 0px 7px 10px 6px rgba(0,0,0,0.12)"
                    : " 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);",
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  bgcolor: myArray[index],
                  borderRadius: "15px",
                }}
              >
                <img
                  src={data?.photoURL}
                  alt=""
                  height="60px"
                  width="65px"
                  style={{
                    marginBottom: "-7px",
                    filter: "drop-shadow(7px 6px 8px #131313)",
                  }}
                />
              </Paper>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "160px",
                  color: text_color,
                  fontFamily: "Poppins, sans-serif",
                  ml: "10px",
                }}
              >
                <Box sx={{ color: textHeading, fontSize: "14px" }}>
                  {data?.displayName}
                </Box>
                <Box sx={{ mt: "4px" }}>
                  <Typography
                    sx={{ fontSize: "11px", fontFamily: "Poppins, sans-serif" }}
                  >
                    {" "}
                    {data?.email}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  color: text_color,
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                <Box
                  sx={{
                    fontSize: "9px",
                    mb: "4px",
                    color: text_color,
                    mt: "4px",
                    mr: "2px",
                  }}
                >
                  12:59AM
                </Box>
                <Box
                  sx={{
                    bgcolor: "#6b8afd",
                    height: "19px",
                    width: "19px",
                    borderRadius: "50%",
                    textAlign: "center",
                    verticalAlign: "middle",
                    mb: "4px",
                    color: textHeading,
                  }}
                >
                  <Typography
                    sx={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
                  >
                    {" "}
                    2
                  </Typography>
                </Box>
                <Box sx={{ mb: "-4px" }}>
                  <BsFillPinAngleFill />
                </Box>
              </Box>
            </Paper>
          ))}
    </>
  );
};
export default ContactCardList;
