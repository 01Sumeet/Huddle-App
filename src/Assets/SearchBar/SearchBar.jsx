import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { FiSearch } from "react-icons/fi";

const SearchBar = (prop) => {
  return (
    <Paper
      elevation={10}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "263px",
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
        <FiSearch size={21} />
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
        placeholder="Search Contacts"
        value={prop.val}
        onChange={prop.onChange}
      />
    </Paper>
  );
};

export default SearchBar;
