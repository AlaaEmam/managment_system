import axios from "axios";

const baseURL = `https://upskilling-egypt.com:3003/api/v1`;
export const BASE_IMG_URL = `https://upskilling-egypt.com:3003`;

//I changed this

export  const axiosInstance=axios.create({baseURL, 
  headers:{Authorization:localStorage.getItem("token")} })

export const AUTHURLS = {
  loginUrl: `/Users/Login`,
  forgetUrl: `/Users/Reset/Request`,
  resetUrl: `/Users/Reset`,
  changePassUrl: `/Users/ChangePassword`,
  registerUrl: `/Users/Register`,
  verifyAccountUrl: `/Users/verify`,
};

export const PROJECTSURLS = {
    getAll: `/Project/manager`,
    addUrl: `/Project`,
   // deleteUrl(id):`/Project/${id}`,
};

export const TASKSURLS = {
    getAll: `/Task/manager`,
    addUrl: `/Task`,
    updateUrl: (id: string) => `/Task/${id}`,
}

export const USERSSURLS = {
    getUsersUrl: `/Users/Manager`,
    toggleStatusUrl: (id: string) => `/Users/${id}`,
}
