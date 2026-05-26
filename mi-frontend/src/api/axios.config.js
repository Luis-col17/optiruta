import axios from "axios";

const axiosConfig = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
    "Content-Type": "application/json",
    },
timeout: 10000,
});

axiosConfig.interceptors.request.use((config) => {
    console.log("Petición:", config.url);
    return config;
});

axiosConfig.interceptors.response.use(
    (response) => response,
    (error) => {
    console.error("Error API:", error);
    return Promise.reject(error);
}
);

export default axiosConfig;