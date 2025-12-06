import cookie from "react-cookies";


export const UserReducer = (current, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...current, ...action.payload };
        case 'UPDATE':
            return { ...current, ...action.payload };
        case 'LOGOUT':
            return null;
        default:
            return current;
    }
};
