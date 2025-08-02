import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Briefcase, LogOut } from "lucide-react";
import useAuth from "../../customHooks/useAuth";
import axios from "axios";
import { serverObj } from "../../config/serverConfig";
import { handleSuccessMsg } from "../../config/toast";

const SeekerProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  console.log(user);

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${serverObj.serverAPI}/user/logoutUser`, {
        withCredentials: true,
      });
      handleSuccessMsg(res.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-primary-hover h-32"></div>

          <div className="px-6 py-4 relative ">
            <div className="absolute -top-13 left-6">
              <div className="h-24 w-24 rounded-full  bg-gray-200 flex items-center justify-center">
                <img
                  src={user.profilePic}
                  className="h-full w-full rounded-full"
                />{" "}
              </div>
            </div>

            <div className="ml-32">
              <h1 className="text-2xl font-bold text-gray-900">
                {user.fullName}
              </h1>
              <p className="text-gray-600">{user.role}</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">About</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-800">{user.email}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Briefcase className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-gray-800">
                    {new Date(user.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerProfile;
