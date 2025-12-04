import {
    Box,
    Button,
    Container,
    Grid,
    Typography,
    Paper,
    Stack,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TimelineIcon from "@mui/icons-material/Timeline";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Link as RouterLink } from "react-router-dom";

export default function Home() {
    return (
        <Box sx={{ bgcolor: "#f7f7f7", minHeight: "100vh", pt: 8 }}>

            {/* HERO SECTION */}
            <Container maxWidth="md" sx={{ textAlign: "center", mb: 8 }}>
                <Typography variant="h3" fontWeight="bold" mb={2}>
                    Chào mừng đến với Habit Tracker
                </Typography>

                <Typography variant="h6" color="text.secondary" mb={4}>
                    Xây dựng thói quen tốt mỗi ngày. Theo dõi – phân tích – cải thiện bản thân.
                </Typography>

                <Stack direction="row" justifyContent="center" spacing={2}>
                    <Button
                        variant="contained"
                        size="large"
                        component={RouterLink}
                        to="/signup"
                    >
                        Bắt đầu ngay
                    </Button>

                    <Button
                        variant="outlined"
                        size="large"
                        component={RouterLink}
                        to="/login"
                    >
                        Đăng nhập
                    </Button>
                </Stack>
            </Container>

            {/* FEATURES */}
            <Container maxWidth="lg" sx={{ pb: 10 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Paper
                            elevation={3}
                            sx={{ p: 3, textAlign: "center", borderRadius: 3 }}
                        >
                            <CheckCircleIcon sx={{ fontSize: 50, mb: 2 }} color="primary" />
                            <Typography variant="h6" fontWeight="bold">
                                Theo dõi thói quen
                            </Typography>
                            <Typography mt={1} color="text.secondary">
                                Ghi lại các thói quen mỗi ngày, giúp bạn duy trì sự ổn định.
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper
                            elevation={3}
                            sx={{ p: 3, textAlign: "center", borderRadius: 3 }}
                        >
                            <TimelineIcon sx={{ fontSize: 50, mb: 2 }} color="primary" />
                            <Typography variant="h6" fontWeight="bold">
                                Thống kê chi tiết
                            </Typography>
                            <Typography mt={1} color="text.secondary">
                                Biểu đồ và số liệu giúp bạn hiểu rõ tiến trình của mình.
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper
                            elevation={3}
                            sx={{ p: 3, textAlign: "center", borderRadius: 3 }}
                        >
                            <AutoAwesomeIcon sx={{ fontSize: 50, mb: 2 }} color="primary" />
                            <Typography variant="h6" fontWeight="bold">
                                Phát triển bản thân
                            </Typography>
                            <Typography mt={1} color="text.secondary">
                                Thay đổi cuộc sống từng bước, bắt đầu từ thói quen nhỏ.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}