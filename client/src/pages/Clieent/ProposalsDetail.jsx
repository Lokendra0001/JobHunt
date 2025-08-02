import React, { useEffect, useState } from "react";
import { serverObj } from "../../config/serverConfig";
import axios from "axios";
import {
  CheckCircle2,
  XCircle,
  Clock,
  User,
  IndianRupee,
  ChevronLeft,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/common/Loader";

const ProposalsDetail = () => {
  const serverAPI = serverObj.serverAPI;
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //Fetch the current Project and display it with Proposals
  const fetchAllProposals = async () => {
    try {
      const res = await axios.get(
        `${serverAPI}/freelancerProject/get-allProposals`,
        { withCredentials: true, headers: { projectId: id } }
      );
      if (res.data && res.data) {
        setProject(res.data);
      }
    } catch (error) {
      console.error("Error fetching proposals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProposals();
  }, []);

  const handleAcceptReject = async (proposalId, action) => {
    try {
      const res = await axios.patch(
        `${serverAPI}/freelancerProject/${action}-proposal`,
        { proposalId, _id: project._id },
        { withCredentials: true }
      );

      console.log(res);

      fetchAllProposals(); // Refresh the list after action
    } catch (error) {
      console.error(`Error ${action}ing proposal:`, error);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Accepted":
        return (
          <span className="flex items-center px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            Accepted
          </span>
        );
      case "Rejected":
        return (
          <span className="flex items-center px-3 py-1 text-sm font-medium text-red-800 bg-red-100 rounded-full">
            <XCircle className="w-4 h-4 mr-1" />
            Rejected
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

  if (loading) return <Loader />;

  return (
    <div className="container  py-8 mx-auto max-w-7xl min-h-[90dvh]">
      {/* Back Button */}
      <button
        className="flex relative  mb-4  text-gray-500 font-medium"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft />
        Back
      </button>
      <h1 className="mb-4 text-2xl font-bold text-primary">All Proposals</h1>

      <div className="space-y-6">
        <div
          key={project._id}
          className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
        >
          <div className="flex flex-col justify-between md:flex-row">
            <div className="flex-1">
              <h2 className="mb-2 text-xl font-semibold text-gray-900">
                {project.title}
              </h2>
              <p className="mb-4 text-gray-600 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center mb-4">
                <span className="mr-4 text-gray-700">
                  Budget:{" "}
                  <span className="font-medium">
                    <IndianRupee className="inline w-4 h-4" />
                    {project.minBudget.toLocaleString()} -{" "}
                    {project.maxBudget.toLocaleString()} ({project.budgetType})
                  </span>
                </span>
              </div>
            </div>
          </div>

          <hr className="my-4 border-gray-200" />

          <h3 className="mb-3 text-lg font-medium text-gray-900">
            Proposals ({project.proposals.length})
          </h3>

          <div className="space-y-4">
            {project.proposals.map((proposal) => (
              <div
                key={proposal._id}
                className="p-4 border border-gray-200 rounded-lg"
              >
                {console.log(proposal)}
                <div className="flex flex-col justify-between md:flex-row md:items-center">
                  <div className="flex items-start mb-4 md:mb-0">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full">
                        <img
                          src={proposal.seeker_id.profilePic}
                          className="h-full w-full rounded-full"
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-primary">
                        {proposal.seeker_id?.fullName || "Unknown Freelancer"}
                      </h4>
                      <p className="text-sm text-gray-600">
                        • {proposal.seeker_currentStatus}
                      </p>
                      <div className="flex gap-2">
                        <p className="mt-1 text-sm text-gray-700">
                          Bid Amount :
                          <IndianRupee className="inline w-3 h-3" />
                          {proposal.bidAmount.toLocaleString()}
                        </p>
                        <p className="mt-1 text-sm text-gray-700">
                          Delivery Time : {proposal.deliveryTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {getStatusBadge(proposal.status || "Pending")}

                    {(!proposal.status || proposal.status === "Pending") && (
                      <>
                        <button
                          onClick={() =>
                            handleAcceptReject(proposal._id, "accept")
                          }
                          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleAcceptReject(proposal._id, "reject")
                          }
                          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <h5 className="mb-2 text-sm font-medium text-gray-900">
                    Cover Letter
                  </h5>
                  <p className="text-sm text-gray-700 whitespace-pre-line ">
                    {proposal.coverLetter}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalsDetail;
