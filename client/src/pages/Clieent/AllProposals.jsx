import React, { useEffect, useState } from "react";
import {
  Clock,
  CheckCircle2,
  XCircle,
  DollarSign,
  MapPin,
  Calendar,
  User,
  XCircleIcon,
  IndianRupee,
  ChevronRight,
  LoaderIcon,
  HandshakeIcon,
} from "lucide-react";
import { serverObj } from "../../config/serverConfig";
import axios from "axios";
import Loader from "../../components/common/Loader";
import useAuth from "../../customHooks/useAuth";
import { Link } from "react-router-dom";

const AppliedForm = () => {
  const serverAPI = serverObj.serverAPI;
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Fetch data on component mount
  useEffect(() => {
    const fetchAllAppliedForm = async () => {
      try {
        const res = await axios.get(
          `${serverAPI}/freelancerProject/get-allProjects`,
          {
            withCredentials: true,
          }
        );
        if (res.data && res.data) {
          res.data.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setProjects(res.data);
        }
      } catch (error) {
        console.error("Error fetching applied forms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllAppliedForm();
  }, []);

  // Function to get the status of the applied form
  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return (
          <span className="flex items-center px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            Completed
          </span>
        );
      case "Assigned":
        return (
          <span className="flex items-center px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
            <HandshakeIcon className="w-4 h-4 mr-1" />
            Assigned
          </span>
        );
      default:
        return (
          <span className="flex items-center px-3 py-1 text-sm font-medium text-amber-800 bg-amber-100 rounded-full">
            <Clock className="w-4 h-4 mr-1" />
            Pending
          </span>
        );
    }
  };

  // Show loading spinner while data is being fetched
  if (loading) return <Loader />;

  return (
    <div className="py-8 min-h-[90dvh] mx-auto max-w-7xl  select-none">
      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-primary ">
          Your Freelance Project
        </h1>
        <p className="mt-2 text-gray-600 text-sm">
          Track all the projects you've created to and their proposals.
        </p>
      </header>

      {/* Applications List */}
      <div className="space-y-4">
        {projects.map((project) => {
          console.log(project);

          return (
            <div
              key={project._id}
              className="px-6 py-4 transition-all duration-200 bg-white border  border-gray-200 rounded-lg shadow-sm hover:shadow-md group"
            >
              {/* Application Header (Title, Client, Status) */}
              <div className="flex flex-col justify-between sm:flex-row sm:items-start">
                <div className="flex-1">
                  <div className="flex flex-col items-start gap-1 md:pr-50">
                    {/* Project Title */}
                    <h3 className="text-lg font-semibold text-gray-800 transition-colors">
                      {project.title}
                    </h3>

                    <p className="line-clamp-2 sm:line-clamp-1 mb-1 text-gray-500 text-sm">
                      {project.description}
                    </p>

                    <span className="w-fit">
                      {getStatusBadge(project.status)}
                    </span>
                  </div>
                </div>

                {/* Application Meta (Date, Actions) */}
                <div className="mt-4 sm:mt-0 sm:text-right">
                  {/* Application Date */}
                  <p className="flex items-center justify-end mb-3 text-gray-600 sm:justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      Applied on:{" "}
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </p>

                  {/* Action Buttons */}
                  <div className="flex justify-end  space-x-2 ">
                    <Link
                      to={`${project._id}`}
                      className="px-4 py-2 text-sm font-medium border border-primary text-primary bg-white hover:text-white hover:bg-primary rounded-md transition-colors duration-100 shadow-sm"
                    >
                      View Proposals
                    </Link>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <hr className="my-4 border-gray-200" />

              {/* Application Details (Budget, Skills) */}
              <div className="flex flex-col justify-between md:flex-row md:items-end">
                {/* Budget Information */}
                <div className="space-y-2">
                  {/* Project Budget Range */}
                  <p className="flex items-center text-gray-700">
                    <IndianRupee className="w-4 h-4 mr-2" />
                    <span className="font-medium">
                      {project.minBudget.toLocaleString("en-IN")} -{" "}
                      {project.maxBudget.toLocaleString("en-IN")}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      ({project.budgetType})
                    </span>
                  </p>
                </div>

                {/* Required Skills */}
                <div className="mt-4 md:mt-0">
                  <div className="flex flex-wrap gap-2 justify-end md:justify-start">
                    {project.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs font-medium text-primary bg-indigo-100 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {!loading && projects.length === 0 && (
        <div className="p-10 text-center bg-white  rounded-lg shadow-sm">
          <div className="mx-auto max-w-md">
            <h3 className="mb-3 text-xl font-medium text-gray-900">
              No Project Found
            </h3>
            <p className="mb-6 text-gray-600">
              You haven't Created any projects yet. Create projects to find your
              next freelancer.
            </p>
            <Link
              to="/client/create-newProject"
              className="flex gap-1 items-center w-fit mx-auto px-6 py-3 font-medium text-white bg-primary rounded-md hover:bg-primary-hover transition-colors "
            >
              Browse Projects
              <ChevronRight size={19} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppliedForm;
