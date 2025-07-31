import React from "react";
import {
  Briefcase,
  Bell,
  CheckCircle,
  Clock,
  DollarSign,
  User,
  XCircle,
} from "lucide-react";

const ClientDashboard = () => {
  // Mock data
  const stats = {
    projects: 5,
    active: 2,
    proposals: 8,
    completed: 3,
  };

  const recentProjects = [
    {
      id: 1,
      title: "Build a Portfolio Website",
      status: "Open",
      proposals: 3,
      budget: "$300",
      type: "Fixed",
    },
    {
      id: 2,
      title: "Logo Design",
      status: "Open",
      proposals: 2,
      budget: "$150",
      type: "Fixed",
    },
  ];

  const recentProposals = [
    {
      id: 1,
      freelancer: "Riya",
      bid: "$280",
      days: 5,
      project: "Portfolio Website",
    },
    {
      id: 2,
      freelancer: "John",
      bid: "$300",
      days: 7,
      project: "Portfolio Website",
    },
  ];

  const notifications = [
    {
      id: 1,
      message: 'John applied to "Portfolio Website"',
      time: "2 hours ago",
    },
    {
      id: 2,
      message: 'Your project "Logo Design" got 2 new proposals',
      time: "1 day ago",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, Rakesh!</h1>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Briefcase size={18} />
          Post a New Project
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-50 p-2 rounded-full">
              <Briefcase className="text-indigo-600" size={20} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Projects</p>
              <p className="text-xl font-semibold">{stats.projects}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2 rounded-full">
              <Clock className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Active</p>
              <p className="text-xl font-semibold">{stats.active}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-green-50 p-2 rounded-full">
              <User className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Proposals</p>
              <p className="text-xl font-semibold">{stats.proposals}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-purple-50 p-2 rounded-full">
              <CheckCircle className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Completed</p>
              <p className="text-xl font-semibold">{stats.completed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Briefcase className="text-indigo-600" size={20} />
            Recent Projects
          </h2>
          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {recentProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 border-b border-gray-100 last:border-0"
            >
              <div>
                <h3 className="font-medium text-gray-800">{project.title}</h3>
                <div className="flex items-center gap-4 mt-1">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      project.status === "Open"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {project.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    {project.proposals} Proposals
                  </span>
                  <span className="text-sm font-medium">
                    {project.budget} {project.type}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                  View
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm hover:bg-gray-200">
                  Close
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Proposals */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <User className="text-indigo-600" size={20} />
            Recent Proposals
          </h2>

          <div className="space-y-4">
            {recentProposals.map((proposal) => (
              <div
                key={proposal.id}
                className="p-4 border border-gray-100 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {proposal.freelancer}
                    </h3>
                    <p className="text-sm text-gray-500">{proposal.project}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium flex items-center justify-end gap-1">
                      <DollarSign size={16} />
                      {proposal.bid}
                    </p>
                    <p className="text-sm text-gray-500">
                      {proposal.days} days
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center justify-center gap-1">
                    <CheckCircle size={16} />
                    Accept
                  </button>
                  <button className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center justify-center gap-1">
                    <XCircle size={16} />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Bell className="text-indigo-600" size={20} />
              Notifications
            </h2>
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              Mark All as Read
            </button>
          </div>

          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <p className="text-gray-800">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {notification.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
