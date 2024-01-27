import axios from "axios";
import { useRouter } from "next/router";

const Axios = axios.create();

Axios.defaults.baseURL = "https://api.travelend.co.kr";

if (typeof window !== "undefined") {
  Axios.defaults.headers.common["x-auth-token"] =
    window.localStorage.getItem("login-token");
}

// 토큰 만료 시 refresh token 재발급
Axios.interceptors.response.use(
    (res) => res,
    async (err: any) => {
        const {
            config,
            response: { status }
        } = err;
        console.log(err);
        // access token 만료 시
        if (status === 403) {
            try {
                const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/uset/token-reissue", 
                {
                  refreshToken: localStorage.getItem("refreshToken")
                },
                {
                  withCredentials: true
                });
                const accessToken = res.data.data.accessToken;
                const refreshToken = res.data.data.refreshToken;
                localStorage.setItem('login-token', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                config.headers.common["Authorization"] = "Bearer " + accessToken;
                return axios(config);
            } catch (e: any) {
                const router = useRouter();
                // refresh token 만료 시
                if (e?.response?.status === 401 || e?.response?.status === 403){
                    // 로그인 페이지로 이동
                    router.push("/auth/signIn");
                    alert('로그인을 다시 진행해 주세요.');
                }
            }
        }
    }
)

export default Axios;
