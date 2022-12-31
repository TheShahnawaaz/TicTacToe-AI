import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled, alpha } from "@mui/material/styles";
import { pink } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#333232",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

const drawerWidth = 300;
const navItems = ["Home", "About"];

function DrawerAppBar(props) {
  const { window } = props;
  // console.log(window);
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  useEffect(() => {}, [mobileOpen]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const [alignment, setAlignment] = React.useState("hard");

  const handleChange = (event, newAlignment) => {
    if (newAlignment) setAlignment(newAlignment);
  };
  const easy = useCallback(
    () => navigate("/easy", { replace: true }),
    [navigate]
  );
  const hard = useCallback(() => navigate("/", { replace: true }), [navigate]);
  const drawer = (
    <ThemeProvider theme={theme}>
      <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
        <Typography variant="h6" sx={{ my: 2 }}>
          Intelligent Tic Tac Toe
        </Typography>
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </ThemeProvider>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }} theme={theme}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "block", sm: "block" },
                fontSize: { xs: "15px", md: "30px" },
              }}
            >
              Intelligent TicTacToe
            </Typography>
            <ToggleButtonGroup
              color="error"
              variant="filled"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="hard" colour="error" onClick={hard}>
                Hard
              </ToggleButton>
              <ToggleButton value="easy" onClick={easy}>
                Easy
              </ToggleButton>
            </ToggleButtonGroup>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: "#fff" }}>
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" sx={{ p: 0 }}>
          <Toolbar />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
