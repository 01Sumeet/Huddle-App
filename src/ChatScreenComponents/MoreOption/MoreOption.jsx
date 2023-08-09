/* eslint-disable default-case */
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import EditIcon from "@mui/icons-material/Edit";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import "./MoreOption.css";
import { ImAttachment } from "react-icons/im";
import { storage } from "../../Firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useSelectedMenu } from "../../Context/SelectedMenu";
import { v4 as uuidv4 } from "uuid";

export default function MoreOption() {
  const { setImgFile } = useSelectedMenu();
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

    try {
      const storageRef = ref(storage, `${uuidv4()}`);
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
              setOpen(false);
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
