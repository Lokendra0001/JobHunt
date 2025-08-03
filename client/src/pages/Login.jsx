import React, { useState } from "react";
import {
  Mail,
  User2Icon,
  LockKeyhole,
  LogIn,
  AtSignIcon,
  LogInIcon,
  Loader2,
} from "lucide-react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/Logo.png";
import loginSideImage from "../assets/images/loginSide.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { serverObj } from "../config/serverConfig";
import { handleErrorMsg, handleSuccessMsg } from "../config/toast";
import { useDispatch } from "react-redux";
import { addUser } from "../store/slices/authSlice";

const Login = () => {
  const serverAPI = serverObj.serverAPI;
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getNavigation = (role) => {
    if (role == "Seeker") return "/seeker";
    if (role == "Client") return "/client";
    return "/seeker";
  };

  const handleLogin = (data) => {
    setLoading(true);
    axios
      .post(`${serverAPI}/user/normalLogin`, data, { withCredentials: true })
      .then((res) => {
        handleSuccessMsg(res.data.message);
        dispatch(addUser({ user: res.data.user, role: res.data.user.role }));
        const role = res.data.user.role;
        navigate(getNavigation(role));
      })
      .catch((err) => handleErrorMsg(err.response.data.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center    w-full select-none">
      <div className="sm:mx-auto sm:w-full sm:max-w-[1000px]  relative p-5  rounded-2xl ">
        <div className="absolute hidden top-7 left-7 sm:flex gap-1">
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <img src={logo} alt="J" className="h-full w-full" />
          </div>
          <h2 className="text-lg font-medium font-[Roboto-SemiBold]">
            JobHunt
          </h2>
        </div>

        <div className="min-h-[90dvh] h-full w-full flex flex-col  justify-center md:flex-row gap-10">
          {/* Image Section */}
          <div className="w-full md:w-2/3 hidden sm:block aspect-[4/3] rounded-lg overflow-hidden pointer-events-none">
            <img
              src={loginSideImage}
              alt="Signup illustration"
              className="w-full h-full object-cover "
            />
          </div>

          {/* Form Section */}
          <div className="md:w-1/2 sm:pt-10 flex flex-col items-center gap-6">
            <h2 className="text-center text-2xl font-bold text-gray-900 flex gap-1 items-center">
              <img src={logo} alt="J" className="h-7 w-7" /> Welcome Back to
              JobHunt
            </h2>

            <div className="space-y-6 self-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  Sign in to your account
                </h2>
                <p className="text-gray-500 text-sm">
                  Enter your credentials to access your account
                </p>
              </div>
            </div>

            <form
              className="space-y-6 w-full"
              onSubmit={handleSubmit(handleLogin)}
            >
              <Input
                type="email"
                label="Email Address"
                icon={Mail}
                placeholder="xyz@gmail.com"
                {...register("email", {
                  required: "Email is required!",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address!",
                  },
                })}
                error={errors.email?.message}
              />

              <Input
                type="password"
                label="Password"
                icon={LockKeyhole}
                placeholder="•••••••••••"
                {...register("password", {
                  required: "Password is required!",
                })}
                error={errors.password?.message}
              />

              <div className="flex items-center justify-between ">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-primary hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                className={`w-full mt-10 text-white px-4 py-2 ${
                  loading
                    ? "bg-indigo-500 cursor-not-allowed"
                    : "bg-primary hover:bg-primary-hover cursor-pointer"
                }  `}
                loading={loading}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" /> SignIn...
                  </>
                ) : (
                  <>
                    <LogInIcon /> SignIn
                  </>
                )}
              </Button>
            </form>

            <p className="w-full text-start leading-0">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary hover:text-indigo-800 underline"
              >
                SignUp
              </Link>
            </p>

            <div className="text-center text-xs text-gray-500 mt-3">
              <p>
                By login, you agree to our{" "}
                <span className="underline text-primary">Terms of Service</span>{" "}
                and{" "}
                <span className="underline text-primary">Privacy Policy</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
