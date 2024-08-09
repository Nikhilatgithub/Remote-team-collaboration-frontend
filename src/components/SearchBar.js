import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Paper } from "@mui/material";
import '../styles/SimpleStyle.css';

const SearchBar = ({setSearchQuery}) => (
    <Paper>
      <TextField
        id="search-bar"
        className="txtSearchBar"
        onInput={(e) => {
          setSearchQuery(e.target.value);
        }}
        label="Enter a Employee name"
        variant="outlined"
        placeholder="Search..."
        size="small"
      />
      <IconButton  aria-label="search">
        <SearchIcon style={{ fill: "blue" }} />
      </IconButton>
    </Paper>
  );

  export default SearchBar;