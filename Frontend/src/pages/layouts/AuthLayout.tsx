import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { useEffect } from "react";
import { useUserStore } from "@/store/use-user-store";

function AuthLayout() {
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <>
      {user && (
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
