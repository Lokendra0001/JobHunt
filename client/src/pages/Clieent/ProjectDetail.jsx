import React, { useEffect, useState } from "react";
import { Button, Loader } from "../../components/common/Index";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { serverObj } from "../../config/serverConfig";
import useAuth from "../../customHooks/useAuth";
import { ChevronLeft, Code2Icon, WandSparklesIcon } from "lucide-react";

const ProjectDetail = () => {
  const [project, setProject] = useState(null);
  const { role } = useAuth();
  const navigate = useNavigate();

  // Set of random color for profile circle
  const colors = [
    "bg-red-400",
    "bg-orange-400",
    "bg-amber-400",
    "bg-yellow-400",
    "bg-lime-500",
    "bg-green-400",
    "bg-emerald-400",
    "bg-teal-400",
    "bg-cyan-400",
    "bg-sky-400",
    "bg-blue-400",
    "bg-indigo-400",
    "bg-violet-400",
    "bg-purple-400",
    "bg-fuchsia-400",
    "bg-pink-400",
    "bg-rose-400",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const { id } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(
          `${serverObj.serverAPI}/freelancerProject/${id}`,
          { withCredentials: true }
        );
        setProject(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProject();
  }, [id]);

  if (!project) return <Loader />;

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 select-none relative ">
      {/* Back Button */}
      <button
        className="flex relative  mb-4 z-30 xl:absolute xl:top-3 xl:-left-30"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft />
        Back
      </button>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-shrink-0">
          <div
            className={`w-16 h-16 ${randomColor} rounded-full flex items-center justify-center text-white text-2xl font-bold`}
          >
            {project.title?.charAt(0) || "P"}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {project.title}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                  {project.category}
                </span>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full
                  ${
                    project.status === "Open"
                      ? "bg-green-100 text-green-800"
                      : project.status === "Assigned"
                      ? "bg-yellow-100 text-yellow-800"
                      : project.status === "Completed"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {project.status}
                </span>
              </div>
            </div>

            {role == "Seeker" &&
              project.status !== ("Assigned" || "Completed") && (
                <Link
                  to={`/seeker/project/${id}/apply-form`}
                  className="flex gap-3"
                >
                  <Button className="bg-primary hover:bg-primary-hover px-4 py-2 text-primary-text">
                    Apply Now
                  </Button>
                </Link>
              )}
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
            <div>
              Posted : {new Date(project.createdAt).toLocaleDateString()}
            </div>
            <div>
              <span className="font-medium text-gray-700">Location :</span>{" "}
              Remote
            </div>
            <div>
              <label className="font-medium">Stipend : </label>
              {project.budgetType === "Fixed"
                ? `₹${project.minBudget?.toLocaleString(
                    "en-IN"
                  )} - ₹${project.maxBudget?.toLocaleString("en-IN")}`
                : `₹${project.minBudget?.toLocaleString(
                    "en-IN"
                  )} - ₹${project.maxBudget?.toLocaleString("en-IN")}/hr`}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Project Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex gap-2 items-center">
              <WandSparklesIcon size={18} className="text-primary" /> Project
              Description
            </h2>
            <div className=" max-w-none  text-gray-600 tracking-tight">
              {project.description?.split("\n").map((p, i) => (
                <p key={i} className="mb-4">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Skills Required */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex gap-1 items-center">
              <Code2Icon size={20} className="text-primary" /> Skills Required
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 text-sm font-medium bg-indigo-100 text-indigo-600 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              About the Client
            </h3>

            <div className="flex items-center gap-3 mb-4 ">
              <div
                className={`w-12 h-12 ${randomColor} rounded-full flex items-center justify-center text-white text-xl font-bold`}
              >
                {project.client_id?.fullName?.charAt(0) || "C"}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">
                  {project.client_id?.fullName || "Anonymous Client"}
                </h4>
                <p className="text-sm text-gray-500">
                  Member since{" "}
                  {project.client_id?.createdAt
                    ? new Date(project.client_id.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Proposals
                </h4>
                <p className="text-gray-900">
                  {project.proposals?.length || 0}{" "}
                  {role == "Seeker" ? "Applied" : "Received"}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Project Type
                </h4>
                <p className="text-gray-900">{project.budgetType}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Freelancer
                </h4>
                <p className="text-gray-900">
                  {project.assignedFreelancerId
                    ? "Position filled"
                    : "Looking for freelancer"}
                </p>
              </div>
            </div>

            {role == "Seeker" &&
              project.status !== ("Assigned" || "Completed") && (
                <Link to={`/seeker/project/${id}/apply-form`}>
                  <Button className="w-full mt-6 py-2 bg-primary hover:bg-primary-hover text-primary-text">
                    Apply Now
                  </Button>
                </Link>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
