import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import { useRouter } from "next/router";

const sidebarMenuItems = [
  { id: 1, label: "Home", icon: <HomeOutlinedIcon />, route: "/" },
  {
    id: 2,
    label: "Bookmarks",
    icon: <BookmarkBorderOutlinedIcon />,
    route: "/bookmarks",
  },
  {
    id: 3,
    label: "Profile",
    icon: <AccountCircleOutlinedIcon />,
    route: "/profile",
  },

  {
    id: 4,
    label: "Settings",
    icon: <SettingsSuggestOutlinedIcon />,
    route: "/settings",
  },
];

const Navbar = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const router = useRouter();
  const name = session?.user?.name as string;
  const imageUrl = session?.user?.image as string;

  const handleClose = () => {
    setOpen(false);
  };

  const renderDrawer = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setOpen(false)}
      onKeyDown={() => setOpen(false)}>
      <List>
        {sidebarMenuItems.slice(0, 3).map((menuItem) => (
          <Link
            key={menuItem.id}
            href={menuItem.route}
            style={{ textDecoration: "none", color: "goldenrod" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                <ListItemText primary={menuItem.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {sidebarMenuItems.slice(-1).map((menuItem) => (
          <Link
            key={menuItem.id}
            href={menuItem.route}
            style={{ textDecoration: "none", color: "goldenrod" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                <ListItemText primary={menuItem.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => setOpenDrawer(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Photos
          </Typography>
          {session?.user && (
            <div>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography>{name}</Typography>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={() => setOpen(true)}
                  color="inherit">
                  <img
                    src={imageUrl}
                    alt="user"
                    width={45}
                    height={45}
                    style={{ borderRadius: "50%" }}
                  />
                </IconButton>
              </Box>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={() => signOut()}>Log out</MenuItem>
              </Menu>
            </div>
          )}
          {!session?.user && (
            <Box>
              {router.pathname === "/login" ? (
                <Link href="/signup">
                  <Button sx={{ bgcolor: "firebrick" }} variant="contained">
                    Sign up
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={() => signIn()}
                  sx={{ bgcolor: "forestgreen" }}
                  variant="contained">
                  Log in
                </Button>
              )}
            </Box>
          )}
        </Toolbar>
        <Drawer
          open={openDrawer}
          onClick={() => setOpenDrawer(false)}
          onClose={() => setOpenDrawer(false)}>
          {renderDrawer()}
        </Drawer>
      </AppBar>
    </Box>
  );
};

export default Navbar;
