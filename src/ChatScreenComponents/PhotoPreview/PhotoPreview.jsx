import {
  GridList,
  GridListTile,
  makeStyles,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";
import React, { useState } from "react";
import "./styles.css";
import MessageInput from "../../Assets/MessageInput/MessageInput";

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
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("false");

  const handleClose = () => {
    setOpen(false);
  };

  const handleImage = (value) => {
    setImage(value);
    setOpen(true);
    console.log(image);
  };

  return (
    <div className="App">
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
        <Fade in={open} timeout={500} className={classes.img}>
          <img
            src={image}
            alt="asd"
            style={{ maxHeight: "90%", maxWidth: "90%" }}
          />

          <MessageInput />
        </Fade>
      </Modal>
    </div>
  );
};

export default PhotoPreview;

const tileData = [
  {
    img: "images/mis_imagenes/_photobylotte)_1427577185.jpeg",
  },
  {
    img: "images/mis_imagenes/04d1b0f960568ab49f36befff9282397-2.jpg",
  },
  {
    img: "images/mis_imagenes/382656_2412699795172_314272330_n.jpg",
  },
];
