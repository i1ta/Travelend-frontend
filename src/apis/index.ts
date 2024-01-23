import axios from "axios";

const Axios = axios.create();
if (process.browser) {
  Axios.defaults.baseURL = "https://api.travelend.co.kr";
  Axios.defaults.headers.common["x-auth-token"] =
    window.localStorage.getItem("login-token");
  //   Axios.defaults.withCredentials = true;
}

export default Axios;
