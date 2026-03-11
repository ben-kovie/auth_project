import axios from "axios";

const api = axios.create({
  baseURL: "https://auth-project-hbyd.onrender.com/api/v1/auth",
  withCredentials: true,
});


// Attach access token automatically
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// Handle expired access token
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {

        const refreshToken = localStorage.getItem("refreshToken");

        const res = await api.post(
          "/refresh",
          { refreshToken }
        );

        const { accessToken } = res.data;

        localStorage.setItem("accessToken", accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);

      } catch (err) {

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        window.location.href = "/login";

      }
    }

    return Promise.reject(error);
  }
);

export default api;