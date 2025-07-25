import React from "react";
import { Mail, User2Icon, LockKeyhole, LogIn, AtSignIcon } from "lucide-react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import logo from "../assets/images/Logo.png";
import loginSideImage from "../assets/images/loginSide.png";
import Select from "../components/common/Select";
import { useForm } from "react-hook-form";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignup = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-5 w-full select-none">
      <div className="sm:mx-auto sm:w-full sm:max-w-[1000px] relative shadow-xs">
        <div className="absolute sm:top-7 left-3 sm:left-5 flex gap-1">
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <img src={logo} alt="J" className="h-full w-full" />
          </div>
          <h2 className="text-lg font-medium font-[Roboto-SemiBold]">
            JobHunt
          </h2>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-10">
          {/* Image Section */}
          <div className="w-full md:w-2/3 hidden sm:block aspect-[4/3] rounded-2xl overflow-hidden pointer-events-none">
            <img
              src={loginSideImage}
              alt="Signup illustration"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Form Section */}
          <div className="md:w-1/2 pt-10 flex flex-col items-center gap-6">
            <h2 className="text-center text-2xl font-[Roboto-SemiBold] text-gray-900 flex gap-1 items-center">
              <img src={logo} alt="J" className="h-7 w-7" /> Create your account
            </h2>

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
                options={["Seeker", "Recruiter"]}
                label="I want to be"
                {...register("role", {
                  required: "Please select a role!",
                })}
                error={errors.role?.message}
              />

              <Button
                type="submit"
                btnName="Signup"
                icon={LogIn}
                className="text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
              />
            </form>

            <p className="w-full text-start">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-800 underline"
              >
                Login
              </Link>
            </p>

            <div className="w-full mt-2">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-dotted border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="button"
                  className="bg-transparent font-medium text-gray-800 group text-sm border border-gray-300 cursor-pointer hover:bg-indigo-50"
                >
                  <AtSignIcon size={20} className="text-indigo-600" /> Sign Up
                  With Google
                </Button>
              </div>
            </div>

            <div className="text-center text-xs text-gray-500">
              <p>
                By signing up, you agree to our{" "}
                <span className="underline text-indigo-600">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="underline text-indigo-600">
                  Privacy Policy
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
