import React from "react";
import { Select as MUISelect, MenuItem } from "@mui/material";

const Select = ({ selectedSort, setSelectedSort }) => {
  return (
    <MUISelect
      value={selectedSort}
      onChange={(e) => setSelectedSort(e.target.value)}
      displayEmpty
      inputProps={{ "aria-label": "Without label" }}
    >
      <MenuItem value="">
        <em>Sort by</em>
      </MenuItem>
      <MenuItem value={"title"}>Title</MenuItem>
      <MenuItem value={"publish_date"}>Publish date</MenuItem>
      <MenuItem value={"author"}>Author</MenuItem>
    </MUISelect>
  );
};

export default Select;
