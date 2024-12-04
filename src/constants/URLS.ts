import axios from "axios";

const baseURL = `https://upskilling-egypt.com:3003/api/v1`;
export const BASE_IMG_URL = `https://upskilling-egypt.com:3003`;

// إنشاء Axios Instance
export const axiosInstance = axios.create({ baseURL });

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
  addUrl: `/Project`,
};

export const TASKSURLS = {
  getAll: `/Task/manager`,
  addUrl: `/Task`,
  updateUrl: (id: string) => `/Task/${id}`,
};

export const USERSSURLS = {
  getUsersUrl: `/Users/Manager`,
  toggleStatusUrl: (id: string) => `/Users/${id}`,
};
