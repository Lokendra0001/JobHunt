import React, { useState } from "react";
import { Mail, User2Icon, LockKeyhole, LogIn, AtSignIcon } from "lucide-react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/Logo.png";
import loginSideImage from "../assets/images/loginSide.png";
import Select from "../components/common/Select";
import { useForm } from "react-hook-form";
import axios from "axios";
import { serverObj } from "../config/serverConfig";
import { handleErrorMsg, handleSuccessMsg } from "../config/toast";
import { useDispatch } from "react-redux";
import { addUser } from "../store/slices/authSlice";

const Signup = () => {
  const serverAPI = serverObj.serverAPI;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const getNavigation = (role) => {
    if (role == "Seeker") return "/seeker";
    if (role == "Client") return "/client";
    return "";
  };
  const handleSignup = (data) => {
    setLoading(true);
    axios
      .post(`${serverAPI}/user/signUp`, data, { withCredentials: true })
      .then((res) => {
        handleSuccessMsg(res.data.message);
        dispatch(addUser({ user: res.data.user, role: res.data.user.role }));
        navigate(getNavigation(res.data.user.role));
      })
      .catch((err) =>
        handleErrorMsg(
          err?.response?.data?.message ||
            err?.message ||
            "Something Went Wrong!"
        )
      )
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-5 w-full select-none">
      <div className="sm:mx-auto sm:w-full sm:max-w-[1000px] relative shadow-xs ">
        <div className="absolute hidden sm:top-3 left-3 sm:left-5 sm:flex gap-1">
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <img src={logo} alt="J" className="h-full w-full" />
          </div>
          <h2 className="text-lg font-medium font-[Roboto-SemiBold]">
            JobHunt
          </h2>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-10">
          {/* Image Section */}
          <div className="w-full md:w-2/3 hidden sm:block aspect-[4/3] rounded-lg overflow-hidden pointer-events-none">
            <img
              src={loginSideImage}
              alt="Signup illustration"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Form Section */}
          <div className="md:w-1/2 pt-7 flex flex-col items-center gap-6">
            <h2 className="text-center text-2xl font-[Roboto-SemiBold] text-gray-900 flex gap-1 items-center">
              <img src={logo} alt="J" className="h-7 w-7" /> Create your account
            </h2>

            <p className="text-gray-500 leading-0">
              Enter your credentials to access your account
            </p>
            <form
              className="space-y-6 w-full"
              onSubmit={handleSubmit(handleSignup)}
            >
              <Input
                type="text"
                label="Full Name"
                icon={User2Icon}
                placeholder="Enter Full Name"
                {...register("fullName", {
                  required: "Full name required!",
                  minLength: {
                    value: 5,
                    message: "Full name must be more than 5 characters!",
                  },
                })}
                error={errors.fullName?.message}
              />

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
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters!",
                  },
                  pattern: {
                    value: /^(?=.*[0-9])(?=.*[!@#$%^&*])/,
                    message:
                      "Must include at least one number and special character!",
                  },
                })}
                error={errors.password?.message}
              />

              <Select
                options={["Seeker", "Client"]}
                label="I want to be"
                defaultValue="Select Role"
                {...register("role", {
                  required: "Please select a role!",
                })}
                error={errors.role?.message}
              />

              <Button
                type="submit"
                btnName="Signup"
                icon={LogIn}
                className={`text-white w-full   px-4 py-2  ${
                  loading
                    ? "bg-indigo-500 cursor-not-allowed"
                    : "bg-primary hover:bg-primary-hover cursor-pointer"
                }  `}
                loading={loading}
                disabled={loading}
              />
            </form>

            <p className="w-full text-start leading-0">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:text-indigo-800 underline"
              >
                Login
              </Link>
            </p>

            <div className="text-center text-xs text-gray-500">
              <p>
                By signing up, you agree to our{" "}
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

export default Signup;
