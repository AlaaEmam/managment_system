import axios from "axios";

const baseURL = `https://upskilling-egypt.com:3003/api/v1`;
export const BASE_IMG_URL = `https://upskilling-egypt.com:3003`;

//I changed this

export const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: localStorage.getItem("token") },
});

export const requestHeader = {
  headers: { Authorization: `${localStorage.getItem("token")}` },
};
export const privateAxiosInstance = axios.create({ baseURL });

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
};

export const USERSSURLS = {
  getUsersUrl: (p: number, n: number) =>
    `/Users/Manager?pageSize=${p}&pageNumber=${n}`,
  toggleStatusUrl: (id: number) => `/Users/${id}`,
  getUserById: (id: number) => `/Users/${id}`,
  filteruser: (name: string, p: number, n: number) =>
    `/Users/?userName=${name}&pageSize=${p}&pageNumber=${n}`
};
