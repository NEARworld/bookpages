import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Typography,
  Tooltip,
} from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate, useLocation } from "react-router-dom";

import Signup from "./Signup";
import Login from "./Login";
import "../../styles/Navbar.css";
import { styled } from "@mui/material";

const settings = ["Signup", "Login", "Logout"];

const ResponsiveAppBar = ({ user, setUser, setSuccess, setSuccessType }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleSignupOpen = () => setSignupOpen(true);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleSignupClose = () => setSignupOpen(false);
  const handleLoginClose = () => setLoginOpen(false);
  const [signupOpen, setSignupOpen] = React.useState(false);
  const [loginOpen, setLoginOpen] = React.useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handlePages = (e) => {
    console.log(pathname);
    if (e.target.innerText !== "PUBLISH") navigate("/");
    else navigate(`/${e.target.innerText.toLowerCase()}`);
  };

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    setUser(false);
    navigate("/");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const StyledMenuIcon = styled(MenuIcon)(({ theme }) => ({}));

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BookIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Bookstore
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <StyledMenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}
              <MenuItem
                onClick={(e) => {
                  handleCloseNavMenu(e);
                  handlePages(e);
                }}
                variant={pathname === "/" ? "contained" : "secondary"}
              >
                <Typography textAlign="center">ALL BOOKS</Typography>
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  handleCloseNavMenu(e);
                  handlePages(e);
                }}
                onFocus={handlePages}
                variant={pathname === "/publish" ? "contained" : "secondary"}
                disabled={!user}
              >
                <Typography textAlign="center">PUBLISH</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <BookIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Bookstore
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            className="nav-menu-md"
          >
            <Button
              onClick={handleCloseNavMenu}
              onFocus={handlePages}
              sx={{ my: 2, color: "white", display: "block", margin: "3px" }}
              variant={pathname === "/" ? "contained" : "secondary"}
            >
              All Books
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              onFocus={handlePages}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                margin: "3px",
              }}
              variant={pathname === "/publish" ? "contained" : "secondary"}
              disabled={!user}
            >
              PUBLISH
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleCloseUserMenu();
                    !user && setting === "Signup"
                      ? handleSignupOpen()
                      : handleSignupClose();
                    !user && setting === "Login"
                      ? handleLoginOpen()
                      : handleLoginClose();
                    user && setting === "Logout" && handleLogout();
                  }}
                  sx={{
                    display: () => {
                      if (user && setting === "Logout") {
                        return "block";
                      } else if (!user && setting !== "Logout") {
                        return "block";
                      } else {
                        return "none";
                      }
                    },
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
              <Signup
                open={signupOpen}
                handleClose={handleSignupClose}
                setSuccess={setSuccess}
                setSuccessType={setSuccessType}
              />
              <Login
                open={loginOpen}
                handleClose={handleLoginClose}
                setUser={setUser}
              />
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
