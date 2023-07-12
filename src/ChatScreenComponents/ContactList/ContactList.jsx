import { Box, Paper, Typography } from "@mui/material";
import { BsFillPinAngleFill } from "react-icons/bs";
import { DummyContacts } from "../../Data/Contact";
const text_color = "#a9aeba";
const textHeading = "#FEFEFF";

const ContactList = () => {
  const myArray = ["#ffcda5", "#4aac67", "#A9D2FD", "#ffe5a5", "#cd413c"];
  return (
    // <>
    //   {DummyContacts?.contacts?.map((contact, index) => (
    //     <p style={{ marginLeft: "30px", color: "white" }} key={index}>
    //       {contact.name}
    //myArray[Math.floor(Math.random() * 5)]
    //     </p>
    //   ))}
    // </>
    <>
      {DummyContacts?.contacts?.map((data, index) => (
        <Paper
          key={index}
          elevation={4}
          sx={{
            bgcolor: "#2e343d",
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Poppins, sans-serif",
            height: "auto",
            p: "8px",
            mb: "8px",
            borderRadius: "20px",

            // fontSize: "14px",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              bgcolor: data.clr,
              borderRadius: "15px",
            }}
          >
            <img
              src={require("../../Images/computer (1).png")}
              alt=""
              height="60px"
              width="65px"
              style={{ marginBottom: "-7px" }}
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
            <Box sx={{ color: textHeading, fontSize: "14px" }}>{data.name}</Box>
            <Box sx={{ mt: "4px" }}>
              <Typography
                sx={{ fontSize: "11px", fontFamily: "Poppins, sans-serif" }}
              >
                {" "}
                {data.email}
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
                height: "20px",
                width: "20px",
                borderRadius: "50%",
                textAlign: "center",
                mb: "4px",
                color: textHeading,
              }}
            >
              <Typography
                sx={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
              >
                5
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
export default ContactList;
