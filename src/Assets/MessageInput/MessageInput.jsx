import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";

const MessageInput = (prop) => {
  return (
    <Paper
      elevation={10}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "394px",
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
        <BsFillEmojiSmileFill size={20} />
      </IconButton>

      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          p: "0px 10px 0 1px",
          color: "#a9aeba",
          outline: "none",
          border: "0px",
          fontFamily: "Poppins, sans-serif",
          ":focus": {
            border: "none",
          },
        }}
        placeholder={prop.placeHolder}
        value={prop.val}
        onChange={prop.onChange}
      />
      {prop?.sendBtn ? (
        <IconButton sx={{ color: "#a9aeba" }}>
          <AiOutlineSend onClick={prop.onclick} />
        </IconButton>
      ) : null}
    </Paper>
  );
};

export default MessageInput;
