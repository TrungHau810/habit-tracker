import { Avatar, Box, Button, Card, CardContent, Stack, TextField, Typography, Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";


export default function Signup() {
    const [avatar, setAvatar] = useState(null);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(URL.createObjectURL(file));
        }
    };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: (theme) => theme.palette.grey[100],
                p: 2,
            }}
        >
            <Card
                sx={{
                    width: "100%",
                    maxWidth: 420,
                    borderRadius: 3,
                    boxShadow: 3,
                    p: 2,
                }}
            >
                <CardContent>
                    <Typography
                        variant="h5"
                        textAlign="center"
                        fontWeight="bold"
                        mb={3}
                    >
                        Đăng ký tài khoản
                    </Typography>

                    <Stack spacing={2}>
                        <Box textAlign="center">
                            <Avatar
                                src={avatar}
                                sx={{
                                    width: 90,
                                    height: 90,
                                    margin: "0 auto",
                                    mb: 1,
                                }}
                            />
                            <Button variant="outlined" component="label">
                                Chọn ảnh đại diện
                                <input
                                    hidden
                                    accept="image/*"
                                    type="file"
                                    onChange={handleAvatarChange}
                                />
                            </Button>
                        </Box>

                        <TextField
                            label="Tên người dùng"
                            fullWidth
                        />

                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                        />

                        <TextField
                            label="Mật khẩu"
                            type="password"
                            fullWidth
                        />

                        <TextField
                            label="Xác nhận mật khẩu"
                            type="password"
                            fullWidth
                        />

                        <Button variant="contained" size="large" fullWidth>
                            Đăng ký
                        </Button>

                        <Typography variant="body2" textAlign="center">
                            Đã có tài khoản?{" "}
                            <MuiLink
                                component={RouterLink}
                                to="/login"
                                underline="hover"
                                sx={{ fontWeight: 500 }}
                            >
                                Đăng nhập ngay
                            </MuiLink>
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}