import axios from "axios";

const API = axios.create({
  baseURL:"https://fortune-furniture-hub-tg79.vercel.app/",
  withCredentials: true
})

export default API;