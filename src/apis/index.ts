import axios from "axios";

const Axios = axios.create();
if (process.browser) {
  Axios.defaults.baseURL = "https://api.tripyle.xyz";
  Axios.defaults.headers.common["x-auth-token"] =
    window.localStorage.getItem("login-token");
//   Axios.defaults.withCredentials = true;
}

export default Axios;
