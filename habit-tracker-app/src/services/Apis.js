import axios from "axios";
import cookie from 'react-cookies'


const BASE_API_URL = "https://habit-tracker-4p0d.onrender.com/api";


export const authApis = () => axios.create({
    baseURL: BASE_API_URL,
    headers: {
        Authorization: `Bearer ${cookie.load("access_token")}`
    }
});


export default axios.create({
    baseURL: BASE_API_URL,
});