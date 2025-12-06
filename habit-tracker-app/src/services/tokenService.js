import cookie from "react-cookies";
import Apis from "./Apis";

export const refreshTokenAndRetry = async (originalRequest) => {
    try {
        const refresh_token = cookie.load("refresh_token");
        if (!refresh_token) {
            throw new Error("No refresh token available");
        }

        // Gọi API refresh token
        const refreshResponse = await Apis.post("/token/refresh/", { refresh: refresh_token });

        // Lưu access token mới
        const newAccessToken = refreshResponse.data.access;
        cookie.save("access_token", newAccessToken, { path: "/" });

        // Cập nhật header cho request gốc
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Retry request gốc
        return await Apis(originalRequest);
    } catch (error) {
        console.error("Token refresh failed:", error.response?.data || error.message);
        // Xử lý logout hoặc redirect về login nếu refresh token thất bại
        cookie.remove("access_token");
        cookie.remove("refresh_token");
        window.location.href = "/login";
        throw error;
    }
};
