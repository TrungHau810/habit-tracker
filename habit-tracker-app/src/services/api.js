import axios from "axios";


const BASE_URL = 'https://habit-tracker-4p0d.onrender.com/api/';

export const authService = () => axios.create({
    baseURL: BASE_URL,
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
    }
});

export default axios.create({
    baseURL: BASE_URL
});