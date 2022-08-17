import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

// Common request
const request = axios.create({
  baseURL: BASE_URL,
});

request.interceptors.request.use(
  (config) => {
    // const { accessToken } = getTokens();
    // if (accessToken) {
    //   config.headers = {
    //     Authorization: `Bearer ${accessToken}`,
    //   };
    //   config.params = {
    //     ...config.params,
    //   };
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);
export { request };
