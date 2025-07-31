import { Outlet } from "react-router-dom";
const UserLayout = () => {
  return (
    <div className="max-w-7xl  mx-auto lg:px-4 xl:px-0">
      <Outlet />
    </div>
  );
};

export default UserLayout;
