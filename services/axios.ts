import axios from "axios";

export const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://14.225.205.10:9090/api/";
// Create instance
const apiConfig = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiConfig.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
apiConfig.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    const { status } = error.response;
    if (status === 401) {
      return;
    }
    return error.response;
  }
);

const apiServices = {
  post(urlApi: string, params?: any) {
    return apiConfig
      .post(urlApi, params)
      .then((response) => response)
      .catch((error) => error);
  },
  put(urlApi: string, params?: any) {
    return apiConfig
      .put(urlApi, params)
      .then((response) => response)
      .catch((error) => error);
  },
  patch(urlApi: string, params?: any) {
    return apiConfig
      .patch(urlApi, params)
      .then((response) => response)
      .catch((error) => error);
  },
  get(urlApi: string, params?: any) {
    return apiConfig
      .get(urlApi, { params })
      .then((response) => response)
      .catch((error) => error);
  },
  delete(urlApi: string) {
    return apiConfig
      .delete(urlApi)
      .then((response) => response)
      .catch((error) => error);
  },
  postMultipart(urlApi: string, params?: any, urlParam?: string) {
    const instance = axios.create({
      baseURL: urlParam || process.env["API_BASE_URL"],
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 10000,
    });

    return instance
      .post(urlApi, params)
      .then((response) => response)
      .catch((error) => error);
  },
};
export default apiServices;
