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
} from "lucide-react";
import { serverObj } from "../../config/serverConfig";
import axios from "axios";
import Loader from "../../components/common/Loader";
import useAuth from "../../customHooks/useAuth";
import { Link } from "react-router-dom";

const AppliedForm = () => {
  const serverAPI = serverObj.serverAPI;
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Fetch data on component mount
  useEffect(() => {
    const fetchAllAppliedForm = async () => {
      try {
        const res = await axios.get(`${serverAPI}/user/get-allAppliedForm`, {
          withCredentials: true,
        });
        if (res.data && res.data.appliedForm) {
          setAppliedJobs(res.data.appliedForm);
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
  const getStatus = (status) => {
    const statusConfig = {
      Pending: {
        name: "Pending",
        icon: <Clock className="w-4 h-4 text-amber-500" />,
        bg: "bg-amber-100",
        text: "text-amber-600",
      },
      Rejected: {
        name: "Rejected",
        icon: <XCircleIcon className="w-4 h-4 text-red-500" />,
        bg: "bg-red-100",
        text: "text-red-500",
      },
      Accepted: {
        name: "Accepted",
        icon: <CheckCircle2 className="w-4 h-4 text-primary" />,
        bg: "bg-indigo-100",
        text: "text-primary",
      },
      // Default fallback status
      default: {
        name: status || "Unknown",
        icon: <Clock className="w-4 h-4 text-gray-500" />,
        bg: "bg-gray-100",
        text: "text-gray-600",
      },
    };
    return statusConfig[status] || statusConfig.default;
  };

  // Show loading spinner while data is being fetched
  if (loading) return <Loader />;

  return (
    <div className="py-8 min-h-[90dvh] mx-auto max-w-7xl  select-none">
      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-primary ">
          Your Freelance Project Applications
        </h1>
        <p className="mt-2 text-gray-600 text-sm">
          Track all the projects you've applied to and their current status
        </p>
      </header>

      {/* Applications List */}
      <div className="space-y-4">
        {appliedJobs.map((job) => {
          // Find the current user's application in the proposals
          const seeker = job.proposals.find(
            (seeker) => seeker.seeker_id === user._id
          );
          const status = getStatus(seeker?.status);

          return (
            <div
              key={job._id}
              className="px-6 py-4 transition-all duration-200 bg-white border  border-gray-200 rounded-lg shadow-sm hover:shadow-md group"
            >
              {/* Application Header (Title, Client, Status) */}
              <div className="flex flex-col justify-between sm:flex-row sm:items-start">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      {/* Project Title */}
                      <h3 className="mb-1 text-lg font-semibold text-gray-800 transition-colors">
                        {job.title}
                      </h3>

                      {/* Client Info */}
                      <div className="flex items-center mb-2">
                        <User className="w-4 h-4 mr-1 text-gray-500" />
                        <p className="font-medium text-primary">
                          • {job.client_id?.fullName || "Unknown Client"}
                        </p>
                      </div>

                      {/* Application Status Badge */}
                      {seeker && (
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full ${status.bg} ${status.text}`}
                        >
                          {status.icon}
                          <span>{status.name}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Application Meta (Date, Actions) */}
                <div className="mt-4 sm:mt-0 sm:text-right">
                  {/* Application Date */}
                  <p className="flex items-center justify-end mb-3 text-gray-600 sm:justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      Applied on:{" "}
                      {new Date(seeker?.appliedAt).toLocaleDateString()}
                    </span>
                  </p>

                  {/* Action Buttons */}
                  <div className="flex justify-end  space-x-2 ">
                    <Link
                      to={`/seeker/project/${job._id}`}
                      className="px-4 py-2 text-sm font-medium border border-primary text-primary bg-white hover:text-white hover:bg-primary rounded-md transition-colors duration-100 shadow-sm"
                    >
                      View Project
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
                      {job.minBudget.toLocaleString("en-IN")} -{" "}
                      {job.maxBudget.toLocaleString("en-IN")}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      ({job.budgetType})
                    </span>
                  </p>

                  {/* User's Bid Amount */}
                  <p className="flex items-center text-gray-700">
                    <IndianRupee className="w-4 h-4 mr-2" />
                    <span className="font-medium">
                      Your Bid: {seeker?.bidAmount?.toLocaleString("en-IN")}
                    </span>
                  </p>
                </div>

                {/* Required Skills */}
                <div className="mt-4 md:mt-0">
                  <div className="flex flex-wrap gap-2 justify-end md:justify-start">
                    {job.skills.map((skill, index) => (
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
      {!loading && appliedJobs.length === 0 && (
        <div className="p-10 text-center bg-white  rounded-lg shadow-sm">
          <div className="mx-auto max-w-md">
            <h3 className="mb-3 text-xl font-medium text-gray-900">
              No Applications Found
            </h3>
            <p className="mb-6 text-gray-600">
              You haven't applied to any projects yet. Browse available projects
              to find your next opportunity.
            </p>
            <Link
              to="/seeker/findProjects"
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
