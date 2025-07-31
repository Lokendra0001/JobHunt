import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverObj } from "../../config/serverConfig";
import ClientProjectCard from "../../components/clieent/ClientProjectCard";
import Button from "../../components/common/Button";
import { NavLink } from "react-router-dom";
import { Frown } from "lucide-react";

const ClientHome = () => {
  const serverAPI = serverObj.serverAPI;
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${serverAPI}/freelancerProject/get-projects`,
        {
          withCredentials: true,
        }
      );
      setProjects(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load projects. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);

  // Skeleton loader component
  const ProjectCardSkeleton = () => (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 animate-pulse">
      <div className="p-5">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6 mb-6"></div>
        <div className="flex justify-between">
          <div className="h-8 bg-gray-200 rounded w-24"></div>
          <div className="h-8 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="py-8 w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 place-items-center">
        {[...Array(5)].map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[90dvh] text-center p-4">
        <div className="bg-indigo-50 border border-indigo-200 rounded-full p-4 mb-4">
          <Frown className="text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No projects available
        </h3>
        <p className="text-gray-600 mb-6 max-w-md">
          There are currently no projects posted. Create New One!
        </p>
        <NavLink
          to={"/client/create-newProject"}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          Create Now
        </NavLink>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Projects</h1>
        <p className="text-gray-600 mt-2">
          View and manage your freelance projects in one place
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ClientProjectCard
            project={project}
            key={project._id}
            className="transition-transform hover:scale-[1.02] duration-300"
          />
        ))}
      </div>
    </div>
  );
};

export default ClientHome;
