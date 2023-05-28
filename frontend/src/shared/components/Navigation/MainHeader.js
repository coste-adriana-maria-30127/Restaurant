import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Autocomplete, InputBase } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import "./MainHeader.css";

const MainHeader = (props) => {
  const location = useLocation();
  const showSearchBar = location.pathname === "/explor";
  return (
    <header className="main-header">
      <div className="main-header-container">
        <div className="div-props-children">{props.children}</div>
        {showSearchBar && (
          <div className="main-header-right-div">
            <Box display="flex">
              <Typography variant="h6" className="title">
                Explor new places
              </Typography>
              <ShoppingCartIcon color="primary" />
            </Box>
          </div>
        )}
      </div>
    </header>
  );
};

export default MainHeader;
