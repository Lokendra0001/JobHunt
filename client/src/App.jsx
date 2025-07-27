import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home, Signup, Login, FindJob } from "./pages/Index";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import { serverObj } from "./config/serverConfig";
import { useState } from "react";
import { addUser } from "./store/slices/authSlice";
import { handleSuccessMsg } from "./config/toast";
import MainLayout from "./layout/MainLayout";
import CreateCompany from "./pages/CreateCompany";

function App() {
  const serverAPI = serverObj.serverAPI;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${serverAPI}/user/getCurrentUser`, { withCredentials: true })
      .then((res) => {
        addUser(res.data.user);
        handleSuccessMsg(`Welcome Back ${res.data.user.fullName}`);
      })
      .catch((err) => console.log(err.response.data.message));
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/findJob", element: <FindJob /> },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/admin",
      element: <CreateCompany />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router}>
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
      </RouterProvider>
    </>
  );
}

export default App;
