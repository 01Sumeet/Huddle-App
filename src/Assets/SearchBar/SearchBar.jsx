import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { ImAttachment } from "react-icons/im";
import { FiSearch } from "react-icons/fi";

// --bg-color: #131313;
// --bg-up-color: #2e343d;
// --highlight: #6b8afd;
// --text-color: #a9aeba;

const CustomizedInputBase = (prop) => {
  const wid = prop.width;
  return (
    <Paper
      component="form"
      elevation={10}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: wid,
        borderRadius: "15px",
        bgcolor: "#2e343d",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <IconButton
        type="button"
        sx={{ p: "10px 0px 10px 10px", color: "#a9aeba" }}
        aria-label="search"
      >
        {wid === "460px" ? (
          <ImAttachment size={20} />
        ) : (
          <FiSearch size={21} onClick={prop.onClick} />
        )}
      </IconButton>
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          p: "0px 10px 0 1px",
          color: "#a9aeba",
          outline: "none",
          border: "none",
          fontFamily: "Poppins, sans-serif",
        }}
        placeholder={prop.placeHolder}
        value={prop.val}
        onChange={prop.onChange}
        onKeyDown={prop.keyBoardEvent}
        inputProps={{ "aria-label": "search google maps" }}
      />
    </Paper>
  );
};

export default CustomizedInputBase;
