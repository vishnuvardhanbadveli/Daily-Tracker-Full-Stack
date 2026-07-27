import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});


// Global response error handling
api.interceptors.response.use(
  (response) => response,

  (error) => {

    if (error.response) {
      console.error(
        "API Error:",
        error.response.data
      );

    } else if (error.request) {
      console.error(
        "Backend server not reachable"
      );

    } else {
      console.error(
        "Request error:",
        error.message
      );
    }


    return Promise.reject(error);
  }
);


export default api;