/* eslint-disable default-case */
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
import { storage } from "../../Firebase/firebaseConfig";
import { useAuthContext } from "../../Context/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useSelectedMenu } from "../../Context/SelectedMenu";

const actions = [
  { icon: <AddPhotoAlternateIcon />, name: "Send Photo" },
  { icon: <VideocamIcon />, name: "Send Video" },
  { icon: <InsertDriveFileIcon />, name: "Document" },
  { icon: <HeadsetIcon />, name: "Audio File" },
];

export default function MoreOption() {
  const { setImgFile } = useSelectedMenu();
  const { currentUser } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const inputFile = useRef(null);
  const handleSetPhoto = () => {
    console.log("img", image);
    if (!image) {
      return;
    }
    alert();
    try {
      const storageRef = ref(storage, `${currentUser?.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask?.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(
            "Upload is " + progress + "% done",
            snapshot.bytesTransferred,
            snapshot.totalBytes
          );
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running", progress);
              break;
          }
        },
        (error) => {
          console.log("Handle unsuccessful uploads", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log("File available at", downloadURL);
              setImgFile(downloadURL);
              // You can use the downloadURL to display the uploaded image or store it in a database, etc.
            })
            .catch((error) => {
              console.log("Error getting download URL", error);
            });
        }
      );
    } catch (error) {
      console.log("🔴photo upload fail", error);
    }
    setImage(null);
    console.log(image);
  };

  useEffect(() => {
    handleSetPhoto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

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
          onChange={(e) => setImage(e.target.files[0])}
        />
      </SpeedDial>
    </Box>
  );
}
