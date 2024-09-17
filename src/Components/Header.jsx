import { Container, IconButton, Menu, MenuItem, Stack } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { supabase } from "../Utils/SupabaseClient";
const Header = () => {
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const userMenuOpen = Boolean(userMenuAnchor);
  const handleClick = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };
  const handleLogout = () => {
    supabase.auth.signOut();
    setUserMenuAnchor(null);
  };
  const handleClose = () => {
    setUserMenuAnchor(null);
  };
  return (
    <Stack width={"100%"} py={1} sx={{ backgroundColor: "#00000020" }}>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <IconButton
          sx={{
            backgroundColor: "#00308F",
            "&:hover": { backgroundColor: "#00308F" },
          }}
          onClick={handleClick}
        >
          <PersonIcon sx={{ color: "white" }} fontSize="small" />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={userMenuAnchor}
          open={userMenuOpen}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          PaperProps={{
            elevation: 0,
            sx: {
              mt: 0.5,
              border: "1px solid #00000020",
            },
          }}
        >
          <MenuItem onClick={handleLogout} sx={{ fontSize: 14, width: 150 }}>
            Logout
          </MenuItem>
        </Menu>
      </Container>
    </Stack>
  );
};

export default Header;

