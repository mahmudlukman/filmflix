/* eslint-disable react/prop-types */
import { Toolbar } from "@mui/material";

export const MyStyledToolbar = (props) => (
  <Toolbar
    sx={{
      height: "80px",
      display: "flex",
      justifyContent: "space-between",
      marginLeft: "240px",
    }}
  >
    {props.children}
  </Toolbar>
);
