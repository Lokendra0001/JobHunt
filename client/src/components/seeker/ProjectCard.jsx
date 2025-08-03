import React from "react";
import { NavLink } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const {
    assignedFreelancerId,
    budgetType,
    category,
    client_id,
    createdAt,
    description,
    maxBudget,
    minBudget,
    proposals,
    skills,
    status,
    title,
    updatedAt,
    _id,
  } = project;

  return (
    <>
      <NavLink
        to={`/seeker/project/${_id}`}
        className="max-w-md w-full bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg overflow-hidden cursor-pointer transition-shadow duration-200 h-full"
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-3 ">
            <span className="bg-indigo-100 text-primary text-lg font-bold px-3 py-1 rounded-md">
              {category?.slice(0, 1).toUpperCase()}
            </span>
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded-full 
              ${
                status === "Open"
                  ? "bg-green-100 text-green-800"
                  : status === "In Progress"
                  ? "bg-yellow-100 text-yellow-800"
                  : status === "Completed"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {status}
            </span>
          </div>

          {/* Job Title */}
          <div className="mb-3">
            <h2 className="text-lg font-bold text-gray-800 leading-tight line-clamp-1">
              {title}
            </h2>
            <p className="text-indigo-600 text-sm font-medium mt-1">
              {client_id?.fullName || "Rakesh Rajpurohit"} • Remote
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-500 text-sm mb-3 line-clamp-2">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-col ">
            <div className="text-sm text-gray-700">
              {budgetType === "Fixed"
                ? `₹${minBudget.toLocaleString(
                    "en-IN"
                  )} - ₹${maxBudget.toLocaleString("en-IN")} `
                : `₹${minBudget.toLocaleString(
                    "en-IN"
                  )} - ₹${maxBudget.toLocaleString("en-IN")}/hr`}
            </div>

            <span>
              {assignedFreelancerId ? (
                <span className="text-xs text-gray-500">Assigned</span>
              ) : (
                <span className="text-xs text-gray-500">Available</span>
              )}
            </span>
          </div>
        </div>
      </NavLink>
    </>
  );
};

export default ProjectCard;
