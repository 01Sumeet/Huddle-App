import {
  GridList,
  GridListTile,
  makeStyles,
  Modal,
  Backdrop,
  Fade,
  Box,
  IconButton,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./styles.css";
import MessageInput from "../../Assets/MessageInput/MessageInput";
import { useSelectedMenu } from "../../Context/SelectedMenu";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineSend } from "react-icons/ai";
import { useAuthContext } from "../../Context/AuthContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig";
import { useUserChat } from "../../Context/UserChatContext";

const useStyles = makeStyles((theme) => ({
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundcolor: "red",
    },
  },
  img: {
    outline: "none",
  },
}));

const PhotoPreview = () => {
  const classes = useStyles();
  const { currentUser } = useAuthContext();
  const { sender } = useUserChat();
  const [text, setText] = useState("");
  const [open, setOpen] = useState(true);
  const { imgFile, setImgFile } = useSelectedMenu();

  console.log("imggg", imgFile);

  const handleClose = () => {
    setOpen(false);
    setImgFile(null);
  };

  useEffect(() => {
    imgFile ? setOpen(true) : setOpen(false);
  }, [!imgFile === undefined]);
  const handleSent = async () => {
    alert("Hello");
    const combinedId =
      currentUser?.uid > sender?.uid
        ? currentUser?.uid + sender?.uid
        : sender?.uid + currentUser?.uid;

    try {
      // Here we check weather user collection exist in database
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        // If not then we will create here a database with the r
        setDoc(doc(db, "chats", combinedId), { messages: [] });

        // here we update chat between two user
        updateDoc(doc(db, "chats", combinedId), {
          lastMessage: text,
          date: Timestamp.now(),
          senderUid: sender?.uid,
          reciverUid: currentUser?.uid,
          messages: arrayUnion({
            id: uuidv4(),
            img: imgFile,
            text: text,
            senderId: currentUser?.uid,
            date: Timestamp.now(),
          }),
          SenderInfo: {
            pin: false,
            senderId: sender?.uid,
            displayName: sender?.displayName,
            photoURL: sender?.photoURL,
          },
          ReciverInfo: {
            pin: false,
            reciever: currentUser?.uid,
            displayName: currentUser?.displayName,
            photoURL: currentUser?.photoURL,
          },
        });

        setText("");
      } else {
        // here we update chat between two user
        updateDoc(doc(db, "chats", combinedId), {
          messages: arrayUnion({
            id: uuidv4(),
            image: imgFile,
            text: text,
            senderId: currentUser?.uid,
            date: Timestamp.now(),
          }),
        });

        // Here we update last Messages for the user
        updateDoc(doc(db, "chats", combinedId), {
          lastMessage: text,
          date: Timestamp.now(),
        });
      }

      setText("");
      setImgFile(null);
    } catch (error) {
      console.log(error);
    }
  };
  const esckey = (evt) => {
    if (evt.keyCode === 27) {
      alert("Escape");
    }
    if (evt.key === "Enter") {
      if (text.trim() !== "") {
        handleSent();
      }
    }
  };

  return (
    <div
      className="App"
      onKeyDown={(event) => {
        esckey(event);
      }}
    >
      {/* <GridList className={classes.gridList} cols={2.5}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img} className="container">
            <img
              src={tile.img}
              alt={tile.title}
              onClick={(e) => handleImage(tile.img)}
              className="img"
            />
          </GridListTile>
        ))}
      </GridList> */}
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box in={open} timeout={500} className={classes.img}>
          <img
            src={imgFile}
            alt="asd"
            style={{ maxHeight: "400px", maxWidth: "400px" }}
          />
          <MessageInput
            placeHolder="Type your message here..!!!"
            val={text}
            sendBtn={true}
            onclick={handleSent}
            onChange={(e) => setText(e.target.value)}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default PhotoPreview;
