import { Box, Paper, Typography, Stepper } from "@mui/material";
import { BsFillPinAngleFill } from "react-icons/bs";
import { useUserChat } from "../../Context/UserChatContext";
import { useState } from "react";
import { useContactListContext } from "../../Context/ContactListContext";
import { useAuthContext } from "../../Context/AuthContext";

const text_color = "#a9aeba";
const textHeading = "#FEFEFF";

const ContactCardList = (prop) => {
  console.log("Propp", prop?.data);
  const { setSender } = useUserChat();
  const { contactList } = useContactListContext();
  const [selectedContact, setSelectedContact] = useState();
  const { currentUser } = useAuthContext();

  const convertUnixTimestampToTime = (unixTimestamp) => {
    const dateObj = new Date(unixTimestamp * 1000);
    return dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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

  const handleSelect = (uid) => {
    const data = contactList?.find((user) => user.uid === uid);
    if (prop?.showChatOnly === "chats") {
      setSender(data);
      console.log("Dta", data);
    } else {
      setSender(uid);
    }
  };

  // To make card selected
  const handleSelectedContact = (uid) => {
    setSelectedContact(uid);
  };

  const handleContextMenu = (event, val) => {
    event.preventDefault(); // Prevent the default context menu from showing up
    console.log("Right-click event detected!", val);
    // You can perform additional actions here if needed
  };

  const excludedObject = prop?.data?.filter((x) =>
    x?.ReciverInfo?.reciever === currentUser?.uid
      ? x?.SenderInfo?.pin === true
      : x?.ReciverInfo?.pin === true
  );

  // Get an array of indices to exclude
  const excludedIndices = excludedObject?.map((item) =>
    prop?.data?.indexOf(item)
  );

  // Filter the data array to exclude objects at the specified indices
  const filterEx = prop?.data?.filter(
    (x, index) => !excludedIndices?.includes(index)
  );
  const sorted = filterEx?.sort((x, y) => y?.date?.seconds - x?.date?.seconds);
  const data = [...excludedObject, ...sorted];
  // console.log(
  //   "Exx",
  //   excludedObject,
  //   "Filter ======>>>>",
  //   excludedObject.map((x) => x),
  //   "sorted ======================>>>>>>>>>>",
  //   sorted
  //   // prop?.data?.sort((a, b) => a.date.nanoseconds - b.date.nanoseconds)
  // );

  // console.log("Sumitt", data);
  // console.log(
  //   prop?.data,
  //   "sumit",
  //   prop?.data?.filter((x) =>
  //     x?.ReciverInfo?.pin === currentUser?.uid
  //       ? x?.SenderInfo?.pin === true
  //       : x?.ReciverInfo?.pin !== true
  //   )
  // );

  // prop?.data
  // ?.filter((x) =>
  //   x?.ReciverInfo?.pin === currentUser?.uid
  //     ? x?.SenderInfo?.pin === true
  //     : x?.ReciverInfo?.pin !== true
  // )
  // ?.sort((x, y) => y.date.seconds - x.date.seconds)

  return (
    <>
      {prop?.showChatOnly === "chats"
        ? data?.map((data, index) => (
            <Paper
              onContextMenu={(e) =>
                handleContextMenu(
                  e,
                  data?.ReciverInfo?.reciever === currentUser?.uid
                    ? data?.SenderInfo?.senderId
                    : data?.ReciverInfo?.reciever
                )
              }
              onClick={(e) => {
                handleSelect(
                  data?.ReciverInfo?.reciever === currentUser?.uid
                    ? data?.SenderInfo?.senderId
                    : data?.ReciverInfo?.reciever
                );
                handleSelectedContact(
                  data?.ReciverInfo?.reciever === currentUser?.uid
                    ? data?.SenderInfo?.senderId
                    : data?.ReciverInfo?.reciever
                );
              }}
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
                cursor: "pointer",
                boxShadow:
                  selectedContact ===
                  (data?.ReciverInfo?.reciever === currentUser?.uid
                    ? data?.SenderInfo?.senderId
                    : data?.ReciverInfo?.reciever)
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
                  src={
                    data?.ReciverInfo?.reciever === currentUser?.uid
                      ? data?.SenderInfo?.photoURL
                      : data?.ReciverInfo?.photoURL
                  }
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
                  {data?.ReciverInfo?.reciever === currentUser?.uid
                    ? data?.SenderInfo?.displayName
                    : data?.ReciverInfo?.displayName}
                </Box>
                <Box sx={{ mt: "4px" }}>
                  <Typography
                    sx={{
                      fontSize: "11px",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    {" "}
                    {data?.lastMessage}
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
                  {convertUnixTimestampToTime(data?.date)}
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
                    visibility: "hidden",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    {" "}
                    2
                  </Typography>
                </Box>
                <Box
                  title="This Chat is Pinned"
                  sx={{
                    mb: "-4px",
                    visibility:
                      data?.ReciverInfo?.reciever === currentUser?.uid
                        ? data?.SenderInfo?.pin
                          ? "visible"
                          : "hidden"
                        : data?.ReciverInfo?.pin
                        ? "visible"
                        : "hidden",
                  }}
                >
                  <BsFillPinAngleFill />
                </Box>
              </Box>
            </Paper>
          ))
        : prop?.data
            ?.filter((item) => item.uid !== currentUser?.uid)
            .map((data, index) => (
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
                    {data?.displayName}{" "}
                    <Typography
                      component={"small"}
                      title={`${data?.displayName} is online`}
                      sx={{
                        color: "#00FF00",
                        fontSize: "16px",
                        filter: "drop-shadow(1px 1px 2px #00FF00)",
                        visibility: !data?.status ? "visible" : "hidden",
                      }}
                    >
                      ●
                    </Typography>
                  </Box>
                  <Box sx={{ mt: "4px" }}>
                    <Typography
                      sx={{
                        fontSize: "11px",
                        fontFamily: "Poppins, sans-serif",
                      }}
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
                    12:59 AM
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
                      visibility: "hidden",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "14px",
                      }}
                    >
                      {" "}
                      2
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      mb: "-4px",
                      visibility: "hidden",
                    }}
                  >
                    <BsFillPinAngleFill />
                  </Box>
                </Box>
              </Paper>
            ))}
    </>
  );
};
export default ContactCardList;
