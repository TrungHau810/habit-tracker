import { Box, Typography, Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

export default function NotFound() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f7fa",
                px: 2,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 5,
                    textAlign: "center",
                    borderRadius: 3,
                    maxWidth: 450,
                }}
            >
                <SentimentDissatisfiedIcon sx={{ fontSize: 80, color: "#1976d2", mb: 2 }} />

                <Typography variant="h2" fontWeight={700} color="primary" gutterBottom>
                    404
                </Typography>

                <Typography variant="h5" gutterBottom>
                    Trang không tồn tại
                </Typography>

                <Typography sx={{ mb: 3, color: "text.secondary" }}>
                    Có vẻ bạn đã truy cập sai đường dẫn.
                    Vui lòng quay về trang chủ để tiếp tục sử dụng ứng dụng.
                </Typography>

                <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/"
                    sx={{ px: 4, borderRadius: 2 }}
                >
                    Về trang chủ
                </Button>
            </Paper>
        </Box>
    );
}