import axios from "axios";
import cookie from 'react-cookies'


const BASE_API_URL = "http://192.168.1.7:8000/api";


export const authApis = () => axios.create({
    baseURL: BASE_API_URL,
    headers: {
        Authorization: `Bearer ${cookie.load("access_token")}`
    }
});


export default axios.create({
    baseURL: BASE_API_URL,
});