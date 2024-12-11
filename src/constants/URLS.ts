import axios from "axios";

const baseURL = `https://upskilling-egypt.com:3003/api/v1`;
export const BASE_IMG_URL = `https://upskilling-egypt.com:3003`;

// إنشاء Axios Instance
//export const axiosInstance = axios.create({ baseURL });

export const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: localStorage.getItem("token") },
});

export const requestHeader = {
  headers: { Authorization: `${localStorage.getItem("token")}` },
};
export const privateAxiosInstance = axios.create({ baseURL });
// اعتراض الطلبات لإضافة Authorization Header تلقائيًا
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // إضافة التوكن إذا كان موجودًا
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// اعتراض الردود للتعامل مع الأخطاء
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token"); // إزالة التوكن إذا كان غير صالح
      window.location.href = "/login";  // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
    }
    return Promise.reject(error);
  }
);

// تعريف الروابط الثابتة
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
    getEmp: `/Project/employee`,
    addUrl: `/Project`,
    getUrl: (id:string) => `/Project/${id}`,
    deleteUrl:(id:string)=>`/Project/${id}`,
    updateUrl: (id: string) => `/Project/${id}`,

};

export const TASKSURLS = {
  getAll: `${baseURL}/Task/manager`,
  addUrl: `/Task`,
  updateUrl: (id: string) => `/Task/${id}`,
  getCount:`/Task/count`
};

export const USERSSURLS = {
  getUsersUrl: (p: number, n: number) =>
    `/Users/Manager?pageSize=${p}&pageNumber=${n}`,
  toggleStatusUrl: (id: number) => `/Users/${id}`,
  getUserById: (id: number) => `/Users/${id}`,
  filteruser: (name: string, p: number, n: number) =>
    `/Users/?userName=${name}&pageSize=${p}&pageNumber=${n}`,
  filerWithSelect:(InputValue:any,searchValue:any)=>`/Users/?${InputValue}=${searchValue}`,
  userState:`Users/count`
};
