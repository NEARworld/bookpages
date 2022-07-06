import axios from "axios";

// attached things to only this instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// attached things to all the axios requests
// axios.defaults.baseURL = "http://localhost:5000";
// axios.defaults.headers.common = {
//   Authorization: `Bearer ${localStorage.getItem("token")}`,
// };
export default axiosInstance;
