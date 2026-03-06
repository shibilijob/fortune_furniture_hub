import axios from "axios";

const ADMIN_API = axios.create({
    baseURL: "http://localhost:5000/admin",
    withCredentials:true
})

export default ADMIN_API;