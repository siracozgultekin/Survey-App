import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { useUserStore } from "@/store/use-user-store";
import Logo from "@/assets/logoSAS.png";
import LoginBG from "@/assets/bgpho.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        const token = Cookies.get("token");
        if (!token) return;
        const decoded = jwt_decode(token); //unknown tipinde olduğu için stringfy ile json'a çevirip sonra da parse ile objeye çevirdim.
        const dataObj = JSON.parse(JSON.stringify(decoded));
        setUser(dataObj.user);
        navigate("/home");
      } else {
        setError("Geçersiz Kullanıcı adı veya şifre!");
      }
    } catch (error) {
      setError("Geçersiz Kullanıcı adı veya şifre!");
      if (error instanceof AxiosError) {
        console.error(error.response?.data);
      }
      console.error("Login error:", error);
    }
  };
  return (
    <div className="flex  h-full">
      <div
        className=" relative flex w-full flex-col  items-center "
        style={{
          backgroundImage: `url(${LoginBG})`,
          backgroundSize: "cover",
        }}
      >
        <div className="absolute z-[2] h-full w-full bg-white/10 dark:bg-black/50" />{" "}
        <div className="z-[3] mb-8 flex w-[35%] flex-col items-center bg-opacity-0 bg-clip-padding   dark:bg-opacity-0 ">
          <div className="flex w-full pb-16 "></div>
          {/* <img src={Logo} alt="Company Logo" className="w-[30%] " /> */}
          <div className="m-5 flex h-[120px] w-[30%] items-center justify-center border-2">
            Logo Area
          </div>{" "}
          <h2 className="text-xl font-semibold">Company Name</h2>{" "}
          <h2 className="text-xl font-semibold">Giriş Sayfası</h2>
          <h4 className="font-thin italic">"Slogan Example"</h4>
        </div>
        <div className="z-[3] flex h-[40%] min-h-[300px] w-[30%] flex-col items-center justify-center rounded-xl bg-blue-300 bg-opacity-30 bg-clip-padding p-9 backdrop-blur-md backdrop-filter dark:bg-slate-400 dark:bg-opacity-20">
          <form className="flex w-full flex-col gap-4 " onSubmit={handleLogin}>
            {error && (
              <div className="relative flex   rounded-lg border border-red-400 bg-red-100 py-1 pr-4 text-red-700">
                <strong className="mx-1 block sm:inline">
                  <AlertCircle />
                </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <input
              type="text"
              id="email"
              className="h-10 rounded-xl border-2 px-1 text-black dark:border-slate-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              id="password"
              className="h-10 rounded-xl border-2 px-1 text-black dark:border-slate-500"
              placeholder=" Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="mt-6 h-10 rounded-xl border  bg-blue-100 font-semibold text-blue-500 dark:border-slate-400 dark:bg-slate-600 dark:text-white"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
