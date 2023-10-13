import { ModeToggle } from "@/components/mode-toggle";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "@/redux/features/user/user";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
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
        console.log(Cookies.get("token"));
        if (!token) return;
        const decoded = jwt_decode(token); //unknown tipinde olduğu için stringfy ile json'a çevirip sonra da parse ile objeye çevirdim.
        const dataObj = JSON.parse(JSON.stringify(decoded));
        console.log(`dataobject: `, dataObj);
        dispatch(setCurrentUser(dataObj.user));
        navigate("/home");
        // Token'i kullanmak için burada işlem yapabilirsiniz, örneğin yerel depolamada saklayabilirsiniz.
      } else {
        // Hata durumları için uygun işlemleri yapın.
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
      <div className="flex  w-[35%] flex-col items-center bg-blue-200 dark:bg-slate-500 ">
        <div className="flex w-full pb-8 ">
          <ModeToggle />
        </div>
        <img
          src="https://www.vfabrika.com/Content/universal/img/sebit_logo.png"
          alt="SebitPhoto"
          className="w-[90%] "
        />
        <h2 className="text-xl font-semibold">
          Sebit Eğitim ve Bilgi Teknolojileri A.Ş.
        </h2>
        <h4 className="text-lg font-thin italic">
          "Geleceğin eğitimini tasarlıyoruz".
        </h4>

        {/* <FileEdit /> */}
      </div>
      <div
        className=" relative flex w-[65%] flex-col  items-center justify-center"
        style={{
          backgroundImage:
            'url("https://galeri3.arkitera.com/var/albums/Arkiv.com.tr/Proje/ozer-urger-mimarlik-749840472/turk-telekom-odtu-teknokent-ar-ge-binasi/_photo%2000%20(2).jpg.jpeg")',
          backgroundSize: "auto 100%",
        }}
      >
        <div className="absolute z-[2] h-full w-full bg-white/10 dark:bg-black/70" />
        <div className="z-[3] flex h-[40%] min-h-[300px] w-[45%] flex-col items-center justify-center rounded-xl bg-blue-300 bg-opacity-50 bg-clip-padding p-9 backdrop-blur-md backdrop-filter dark:bg-slate-400 dark:bg-opacity-50">
          <form className="flex w-full flex-col gap-2 " onSubmit={handleLogin}>
            <h2 className="  mb-5 rounded-lg px-1 text-center text-[35px]  text-white  dark:shadow-slate-600 ">
              LOGIN
            </h2>
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
              placeholder=" Email"
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
