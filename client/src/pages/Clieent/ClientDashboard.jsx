import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverObj } from "../../config/serverConfig";
import {
  Briefcase,
  Bell,
  CheckCircle,
  Clock,
  DollarSign,
  User,
  XCircle,
  LogOut,
  User2,
  ChevronRight,
  ArrowRightIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { handleErrorMsg, handleSuccessMsg } from "../../config/toast";

const ClientDashboard = () => {
  const serverAPI = serverObj.serverAPI;
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalOpenProject: 0,
    totalAssignedProject: 0,
    totalProposals: 0,
  });

  const fetchAllProjects = async () => {
    try {
      const res = await axios.get(
        `${serverAPI}/freelancerProject/get-projects`,
        {
          withCredentials: true,
        }
      );
      res.data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      console.log(res.data);
      setProjects(res.data);
    } catch (err) {
      handleErrorMsg("Failed to load projects. Please try again later.");
    }
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);

  //Functino use to set the stats of the project
  useEffect(() => {
    const calculateStats = () => {
      const stats = {
        totalOpenProject: 0,
        totalAssignedProject: 0,
        totalProposals: 0,
      };

      projects.forEach((e) => {
        if (e.status === "Open") stats.totalOpenProject++;
        if (e.status === "Assigned") stats.totalAssignedProject++;
        if (e.proposals.length > 0) stats.totalProposals += e.proposals.length;
      });

      setStats(stats);
    };

    calculateStats();
  }, [projects]);

  // Handle Logout function
  const handleLogout = async () => {
    try {
      const res = await axios.get(`${serverObj.serverAPI}/user/logoutUser`, {
        withCredentials: true,
      });
      handleSuccessMsg(res.data.message);
      navigate("/login");
    } catch (err) {
      handleErrorMsg(err.message);
    }
  };

  const statusCard = [
    {
      name: "Total Project",
      icon: <Briefcase className="text-purple-600" size={20} />,
      value: projects.length,
    },
    {
      name: "Open",
      icon: <Clock className="text-blue-600" size={20} />,
      value: stats.totalOpenProject,
    },
    {
      name: "Proposals",
      icon: <User2 className="text-green-600" size={20} />,
      value: stats.totalProposals,
    },
    {
      name: "Assigned",
      icon: <CheckCircle className="text-primary" size={20} />,
      value: stats.totalAssignedProject,
    },
  ];

  const handleCloseProject = async (projectId) => {
    try {
      const res = await axios.delete(
        `${serverObj.serverAPI}/freelancerProject/close-project`,
        {
          withCredentials: true,
          headers: { projectId },
        }
      );
      handleSuccessMsg(res.data.message);
      setProjects((prev) => prev.filter((e) => e._id !== projectId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto select-none py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, Rakesh!</h1>
        <Link
          to={"/client/create-newProject"}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Briefcase size={18} />
          Post a New Project
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statusCard.map((status, i) => (
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-50 p-2 rounded-full">{status.icon}</div>
              <div>
                <p className="text-gray-500 text-sm">{status.name}</p>
                <p className="text-xl font-semibold">{status.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="bg-white rounded-lg shadow-sm sm:border sm:border-gray-200  sm:p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Briefcase className="text-indigo-600" size={20} />
            Recent Projects
          </h2>
          <Link
            to={"/client"}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex gap-1 items-center"
          >
            View All <ArrowRightIcon size={18} />
          </Link>
        </div>

        <div className="space-y-4">
          {projects.slice(0, 3).map((project) => (
            <div
              key={project._id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 sm:p-4 border-b border-gray-200 last:border-0"
            >
              <div>
                <h3 className="font-medium text-gray-800 line-clamp-1">
                  {project.title}
                </h3>
                <div className="flex items-center gap-4 mt-1">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      project.status === "Open"
                        ? "bg-green-100 text-green-800"
                        : "bg-indigo-100 text-primary"
                    }`}
                  >
                    {project.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    {project.proposals.length} Proposals
                  </span>
                  <span className="text-sm font-medium">
                    {project.budget} {project.type}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/client/allProposals/${project._id}`}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                >
                  View
                </Link>
                <button
                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm hover:bg-gray-200"
                  onClick={() => handleCloseProject(project._id)}
                >
                  Close
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex  items-center justify-center w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </button>
    </div>
  );
};

export default ClientDashboard;
