// App.jsx
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser, logoutUser } from "./store/slices/authSlice";
import { serverObj } from "./config/serverConfig";
import MainLayout from "./layouts/MainLayout";
import SeekerLayout from "./layouts/SeekerLayout";
import ClientLayout from "./layouts/ClientLayout";
import { FindJob, SeekerHome } from "./pages/Seeker/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./routes/ProtectedRoute";
import useAuth from "./customHooks/useAuth";
import ClientDashboard from "./pages/Clieent/ClientDashboard";
import NewProject from "./pages/Clieent/NewProject";
import ClientHome from "./pages/Clieent/ClientHome";
import ProjectDetail from "./pages/Clieent/ProjectDetail";
import Loader from "./components/common/Loader";

const App = () => {
  const serverAPI = serverObj.serverAPI;
  const dispatch = useDispatch();
  const { user, role } = useAuth();
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${serverAPI}/user/getCurrentUser`, {
          withCredentials: true,
        });
        dispatch(addUser({ user: res.data.user, role: res.data.user.role }));
      } catch {
        dispatch(logoutUser());
      } finally {
        setAuthLoading(false);
      }
    };

    fetchUser();
  }, []);

  const rolePaths = {
    Seeker: "/seeker",
    Client: "/client",
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        // Role-based homepages
        {
          path: "/seeker",
          element: (
            <ProtectedRoute allowedRoles={["Seeker"]}>
              <SeekerLayout />
            </ProtectedRoute>
          ),
          children: [{ path: "/seeker", element: <SeekerHome /> }],
        },
        {
          path: "/client",
          element: (
            <ProtectedRoute allowedRoles={["Client"]}>
              <ClientLayout />
            </ProtectedRoute>
          ),
          children: [
            { path: "/client", element: <ClientHome /> },
            { path: "profile", element: <ClientDashboard /> },
            { path: "create-newProject", element: <NewProject /> },
            { path: `/client/project/:id`, element: <ProjectDetail /> },
          ],
        },

        // Default redirect
        {
          path: "/",
          element:
            user && role ? (
              <Navigate to={rolePaths[role]} replace />
            ) : (
              <Navigate to="/login" replace />
            ),
        },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
  ]);

  if (authLoading) return <Loader />;
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        toastOptions={{
          className: "text-sm rounded-md shadow-lg ",
          duration: 1500,
          style: {
            background: "#1f2937", // Tailwind gray-800
            color: "#fff",
          },
          success: {
            iconTheme: {
              primary: "#10b981", // Tailwind green-500
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444", // Tailwind red-500
              secondary: "#fff",
            },
          },
        }}
      />
    </>
  );
};

export default App;
