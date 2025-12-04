import { Box, Button, Card, CardContent, Stack, TextField, Typography,   Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";


export default function Login() {
    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: (theme) => theme.palette.grey[100],
                p: 2,
            }}
        >
            <Card
                sx={{
                    width: "100%",
                    maxWidth: 400,
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
                        Đăng nhập
                    </Typography>

                    <Stack spacing={2}>
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

                        <MuiLink
                            component={Link}
                            to="/forgot-password"
                            underline="hover"
                            sx={{ fontSize: 14, textAlign: "right" }}
                        >
                            Quên mật khẩu?
                        </MuiLink>

                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                        >
                            Đăng nhập
                        </Button>

                        <Typography variant="body2" textAlign="center" mt={1}>
                            Chưa có tài khoản?{" "}
                            <MuiLink
                                component={Link}
                                to="/signup"
                                underline="hover"
                                sx={{ fontWeight: 500 }}
                            >
                                Đăng ký ngay
                            </MuiLink>
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    )
}