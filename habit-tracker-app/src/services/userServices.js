import cookie from 'react-cookies'
import Apis, { authApis } from "./Apis"


export const getUserData = async () => {
    const response = await authApis().get("/users/me/")
    return response.data
}

export const userLogin = async (username, password) => {
    const response = await Apis.post("/token/", {
        username,
        password
    })
    cookie.save("access_token", response.data.access)
    cookie.save("refresh_token", response.data.refresh)

    const userData = await getUserData();
    // Lưu thông tin người dùng vào cookie hoặc localStorage nếu cần
    cookie.save("user_data", userData);
    localStorage.setItem("user_data", JSON.stringify(userData));
    return userData;
}
