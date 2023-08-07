import { Paper, Box, Typography } from "@mui/material";
import { useAuthContext } from "../../Context/AuthContext";
import { useStatusContext } from "../../Context/UserStatusContext";
import "../../Animation/Animation.css";

//const bg_up_color = "#2e343d";
const highlight = "#6b8afd";
const textHeading = "#FEFEFF";

const ProfileDetails = (details) => {
  const { currentUser } = useAuthContext();
  const { status } = useStatusContext();

  console.log("detailssss", details);
  return (
    <>
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
          <Box>
            {currentUser?.uid === details?.sender?.uid
              ? "Your Profile Details"
              : "Profile Details"}
          </Box>
        </Box>
        <Paper
          elevation={10}
          key={details?.sender?.displayName}
          sx={{
            animation:
              "swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both",
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
                src={details?.sender?.photoURL}
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
            {details?.sender?.displayName}
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
            {status?.status ? "Offline" : "Online"}
          </Typography>
          <Box
            sx={{
              pt: "5px",
              pb: "3px",
            }}
          >
            <Typography
              component="p"
              sx={{
                fontSize: "10px",
                color: textHeading,
                fontWeight: "300",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {details?.sender?.phoneNumber}
            </Typography>
            <Typography
              component="p"
              sx={{
                fontSize: "10px",
                color: textHeading,
                fontWeight: "300",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {details?.sender?.email}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default ProfileDetails;
