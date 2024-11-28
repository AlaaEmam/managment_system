import axios from "axios";

const baseURL ="https://upskilling-egypt.com:3003/api/v1"


export const axiosInstance = axios.create({baseURL:baseURL});

///user
export const user={
    login:"/Users/Login",
}