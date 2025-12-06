import cookie from 'react-cookies';
import Apis, { authApis } from "./Apis";

export const getUserData = async () => {
    try {
        const response = await authApis().get("/users/me/");
        return response.data;
    } catch (error) {
        console.error("Failed to get user data:", error.response?.data || error.message);
        throw error;
    }
};

export const userLogin = async (username, password) => {
    try {
        const response = await Apis.post("/token/", { username, password });
        const { access, refresh } = response.data;

        cookie.save("access_token", access, { path: "/" });
        cookie.save("refresh_token", refresh, { path: "/" });

        const userData = await getUserData();
        localStorage.setItem("user_data", JSON.stringify(userData));

        return userData;
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        throw error;
    }
};

export const userSignup = async (formData) => {
    try {
        const response = await Apis.post("/users/", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error("Signup failed:", error.response?.data || error.message);
        throw error;
    }
};