import cookie from "react-cookies";


export const UserReducer = (current, action) => {
    switch (action.type) {
        case 'login':
            return action.payload;
        case 'update':
            return { ...current, ...action.payload };
        case 'logout':
            // Xoá cookie và local storage khi đăng xuất
            cookie.remove('access_token');
            localStorage.removeItem("user_data");
            return null;
    }

    return current;
}