import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { useEffect } from "react";
import { useUserStore } from "@/store/use-user-store";
import Cookies from "js-cookie";

function AuthLayout() {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <>
      {token && user && (
        <div className=" z flex-1  grid-cols-[225px_minmax(0,1fr)] items-start  md:grid md:gap-6 ">
          <aside className="fixed top-0 z-30 hidden h-[calc(100vh)]  shrink-0 md:sticky md:block">
            <Sidebar />
          </aside>
          <main className="">
            <section className="">
              <Outlet />
            </section>
          </main>
        </div>
      )}
    </>
  );
}

export default AuthLayout;
