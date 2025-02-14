import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import WindowIcon from "@mui/icons-material/Window";
import MapIcon from "@mui/icons-material/Map";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import defaultLogo from "../assets/freeRoomsLogo.png";
import closedLogo from "../assets/freeroomsDoorClosed.png";

const Navbar = () => {
  const [logo, setLogo] = useState(defaultLogo);

  const handleClick = () => {
    setLogo((prevLogo) => {
      if (prevLogo === defaultLogo) {
        return closedLogo;
      } else {
        return defaultLogo;
      }
    });
  };

  return (
    <AppBar
      position="fixed"
      color="#ffffff"
      sx={{
        boxShadow: "none",
        borderBottom: "2px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 16px",
        }}
      >
        <div className="heading">
          <img src={logo} alt="Logo" onClick={handleClick} className="logo" />
          <span className="title">Freerooms</span>
        </div>

        <div className="icon-buttons">
          <IconButton
            sx={{
              border: "1px solid #ef6c00",
              padding: "5px",
              borderRadius: "5px",
              color: "#ef6c00",
            }}
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: "#ef6c00",
              padding: "5px",
              borderRadius: "5px",
              color: "#ffffff",
            }}
          >
            <WindowIcon />
          </IconButton>
          <IconButton
            sx={{
              border: "1px solid #ef6c00",
              padding: "5px",
              borderRadius: "5px",
              color: "#ef6c00",
            }}
          >
            <MapIcon />
          </IconButton>
          <IconButton
            sx={{
              border: "1px solid #ef6c00",
              padding: "5px",
              borderRadius: "5px",
              color: "#ef6c00",
            }}
          >
            <DarkModeIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
