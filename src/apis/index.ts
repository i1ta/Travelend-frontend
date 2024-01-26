import axios from "axios";

const Axios = axios.create();

Axios.defaults.baseURL = "https://api.travelend.co.kr";

if (typeof window !== "undefined") {
  Axios.defaults.headers.common["x-auth-token"] =
    window.localStorage.getItem("login-token");
}

export default Axios;
