import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
function AuthLayout() {
  return (
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
    // <div className="flex h-full w-full ">
    //   <Sidebar />
    //   <div className="w-[80%]">
    //     {" "}
    //     <Outlet />
    //   </div>
    // </div>
  );
}

export default AuthLayout;
