import { Box, Grid, Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
    const nav = useNavigate();

    return (
        <Box sx={{ backgroundColor: "#1976d2", color: "white", py: 4, mt: 4 }}>
            <Grid container spacing={4} justifyContent="center">

                {/* Cột 1 - Giới thiệu */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6">Habit Tracker</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        Habit Tracker là ứng dụng giúp bạn xây dựng và duy trì những thói quen tốt hàng ngày.
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        Theo dõi tiến trình, phân tích thói quen và cải thiện bản thân mỗi ngày cùng chúng tôi!
                    </Typography>
                </Grid>

                {/* Cột 2 - Liên kết */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6">Liên kết</Typography>
                    <Box sx={{ mt: 1 }}>
                        <Link to="/"
                            style={{
                                color: "white",
                                textDecoration: "none",
                                fontSize: "16px",
                                display: "block",
                                marginBottom: "6px"
                            }}>
                            Trang chủ
                        </Link>
                        <Link to="/products"
                            style={{
                                color: "white",
                                textDecoration: "none",
                                fontSize: "16px",
                                display: "block",
                                marginBottom: "6px"
                            }}>
                            Sản phẩm
                        </Link>
                        <Link to="/about"
                            style={{
                                color: "white",
                                textDecoration: "none",
                                fontSize: "16px",
                                display: "block",
                                marginBottom: "6px"
                            }}>
                            Giới thiệu
                        </Link>
                        <Link to="/contact"
                            style={{
                                color: "white",
                                textDecoration: "none",
                                fontSize: "16px",
                                display: "block",
                                marginBottom: "6px"
                            }}>
                            Liên hệ
                        </Link>
                    </Box>
                </Grid>

                {/* Cột 3 - Thông tin liên hệ */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6">Thông tin liên hệ</Typography>

                    <Box sx={{ mt: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <LocationOnIcon sx={{ mr: 1 }} />
                            <Typography>123 Đường ABC, Quận 1, TP.HCM</Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <EmailIcon sx={{ mr: 1 }} />
                            <Typography>Email: contact@mywebsite.com</Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <PhoneIcon sx={{ mr: 1 }} />
                            <Typography>Hotline: 0909 123 456</Typography>
                        </Box>
                    </Box>

                    {/* Icon mạng xã hội */}
                    <Box sx={{ mt: 2 }}>
                        <IconButton color="inherit"><FacebookIcon /></IconButton>
                        <IconButton color="inherit"><InstagramIcon /></IconButton>
                        <IconButton href="https://github.com/TrungHau810" color="inherit"><GitHubIcon /></IconButton>
                    </Box>
                </Grid>
            </Grid>

            <Typography align="center" sx={{ mt: 3, opacity: 0.7 }}>
                © {new Date().getFullYear()} Habit Tracker. All rights reserved.
            </Typography>
        </Box>
    );
}