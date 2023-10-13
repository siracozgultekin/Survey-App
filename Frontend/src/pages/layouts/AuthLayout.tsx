import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex bg-red-200 h-full">
      <div className="bg-slate-500 w-[40%] flex flex-col items-center py-8 ">
        <img
          src="https://www.vfabrika.com/Content/universal/img/sebit_logo.png"
          alt="SebitPhoto"
        />
        <h2 className="text-lg font-semibold">
          Sebit Eğitim ve Bilgi Teknolojileri AŞ
        </h2>
      </div>

      <Outlet />
    </div>
  );
}

export default AuthLayout;
