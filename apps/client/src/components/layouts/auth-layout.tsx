import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Outlet />
    </div>
  );
};
