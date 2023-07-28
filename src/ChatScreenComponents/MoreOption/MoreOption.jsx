import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import VideocamIcon from "@mui/icons-material/Videocam";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import HeadsetIcon from "@mui/icons-material/Headset";
import EditIcon from "@mui/icons-material/Edit";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import "./MoreOption.css";
import { ImAttachment } from "react-icons/im";
const actions = [
  { icon: <AddPhotoAlternateIcon />, name: "Send Photo" },
  { icon: <VideocamIcon />, name: "Send Video" },
  { icon: <InsertDriveFileIcon />, name: "Document" },
  { icon: <HeadsetIcon />, name: "Audio File" },
];

export default function MoreOption() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const inputFile = React.useRef(null);
  const handleSentPhoto = () => {};

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };
  return (
    <Box
      sx={{
        height: 96,
        transform: "translateZ(0px)",
        flexGrow: 1,
        bgcolor: "red",
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial controlled open example"
        sx={{
          position: "absolute",
          bottom: "53px",
          left: "30px",
        }}
        icon={<ImAttachment openIcon={<EditIcon />} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        <SpeedDialAction
          components={"input"}
          type="file"
          for="file"
          sx={{ bgcolor: "#2E343D", color: "" }}
          key={"Send Photos"}
          icon={<AddPhotoAlternateIcon />}
          tooltipTitle={"Send Photos"}
          // onClick={handleClose}
          onClick={onButtonClick}
        />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          ref={inputFile}
          // onChange={(e) => setImg(e.target.files[0])}
        />
      </SpeedDial>
    </Box>
  );
}
