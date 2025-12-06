import { authApis } from "./Apis";
import { refreshTokenAndRetry } from "./tokenService";


export const getUserHabits = async () => {
    try {
        const response = await authApis().get("/habits/");
        return response.data;
    } catch (error) {
        console.error("Failed to get user habits:", error.response?.data || error.message);
        throw error;
    }
};


export const viewHabitDetails = async (habitId) => {
    try {
        const response = await authApis().get(`/habits/${habitId}/detail/`);
        return response.data;
    } catch (error) {
        // Kiểm tra nếu lỗi do token hết hạn
        if (error.response?.status === 401 && error.response.data.code === "token_not_valid") {
            // Retry request sau khi refresh token
            const retryResponse = await refreshTokenAndRetry(error.config);
            return retryResponse.data;
        }

        console.error("Failed to get habit details:", error.response?.data || error.message);
        throw error;
    }
};


export const createNewHabit = async (habitData) => {
    try {
        // const user = JSON.parse(localStorage.getItem("user_data"));
        // habitData.user = user.id;  // Thêm user ID vào dữ liệu thói quen
        const response = await authApis().post("/habits/", habitData);
        return response.data;
    } catch (error) {
        // Kiểm tra nếu lỗi do token hết hạn
        if (error.response?.status === 401 && error.response.data.code === "token_not_valid") {
            // Retry request sau khi refresh token
            const retryResponse = await refreshTokenAndRetry(error.config);
            return retryResponse.data;
        }

        console.error("Failed to create new habit:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteHabit = async (habitId) => {
    try {
        const response = await authApis().delete(`/habits/${habitId}/`);
        return response.data;
    } catch (error) {
        // Kiểm tra nếu lỗi do token hết hạn
        if (error.response?.status === 401 && error.response.data.code === "token_not_valid") {
            // Retry request sau khi refresh token
            const retryResponse = await refreshTokenAndRetry(error.config);
            return retryResponse.data;
        }

        console.error("Failed to delete habit:", error.response?.data || error.message);
        throw error;
    }
};

export const createHabitLog = async (habitId, logData) => {
    try {
        const response = await authApis().post(`/habits/${habitId}/logs/`, logData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        // Kiểm tra nếu lỗi do token hết hạn
        if (error.response?.status === 401 && error.response.data.code === "token_not_valid") {
            // Retry request sau khi refresh token
            const retryResponse = await refreshTokenAndRetry(error.config);
            return retryResponse.data;
        }
        console.error("Failed to create habit log:", error.response?.data || error.message);
        throw error;
    }
};