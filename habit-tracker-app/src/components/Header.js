import MenuIcon from "@mui/icons-material/Menu";
import {
    AppBar, Box, Button, Drawer,
    IconButton, List, ListItem,
    ListItemButton, ListItemText,
    Stack, Switch, Toolbar,
    Typography, useMediaQuery, useTheme
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const nav = useNavigate();

    const navItems = ["Trang chủ", "Giới thiệu", "Tính năng", "Liên hệ"];
    const navLinks = ["/", "/about", "/features", "/contact"];

    return (
        <AppBar position="static" color="primary" elevation={2}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => nav("/")}>
                    Habit Tracker
                </Typography>

                {!isMobile && (
                    <Stack direction="row" spacing={2} alignItems="center">
                        {navItems.map((item, index) => (
                            <Button key={item} color="inherit" onClick={() => nav(navLinks[index])}>
                                {item}
                            </Button>
                        ))}

                        <Switch />

                        <Button variant="outlined" color="inherit" onClick={() => nav("/login")}>
                            Đăng nhập
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ ml: 1, color: "#fff" }}
                            onClick={() => nav("/signup")}
                        >
                            Đăng ký
                        </Button>
                    </Stack>
                )}

                {isMobile && (
                    <IconButton color="inherit" onClick={() => setOpen(true)}>
                        <MenuIcon />
                    </IconButton>
                )}
            </Toolbar>

            <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                <Box sx={{ width: 250, p: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Menu
                    </Typography>

                    <List>
                        {navItems.map((text) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}

                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Login" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Sign Up" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </AppBar>
    );
}