import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../common/Index";
import useAuth from "../../customHooks/useAuth";
import {
  FiMenu,
  FiX,
  FiHome,
  FiBriefcase,
  FiUsers,
  FiFileText,
  FiSearch,
  FiUser,
} from "react-icons/fi";
import { RiMenu4Line } from "react-icons/ri";
import { Home } from "lucide-react";

const Nav = () => {
  const { role, user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const getLinks = () => {
    const links = {
      Seeker: [
        { name: "Home", to: "/seeker", icon: <Home /> },
        { name: "Find Job", to: "/findJob", icon: <FiSearch /> },
        {
          name: "Browse Project",
          to: "/browseProject",
          icon: <FiBriefcase />,
        },
      ],
      Client: [
        { name: "Home", to: "/client", icon: <Home /> },
        {
          name: "Create Post",
          to: "/client/create-newProject",
          icon: <FiFileText />,
        },
        {
          name: "All Proposals",
          to: "/client/allProposals",
          icon: <FiUsers />,
        },
      ],
    };

    return links[role] || links.Seeker;
  };

  // Add scroll effect to navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const links = getLinks();

  return (
    <>
      {/* Main Navigation Bar */}
      <nav
        className={`w-full h-[10dvh] bg-background backdrop-blur-md py-3 border-b border-gray-100 sticky  z-40 transition-all duration-1000 select-none ${
          scrolled ? "shadow-sm top-0" : "-top-20"
        }`}
      >
        <div className="px-4 h-full  flex justify-between items-center">
          {/* Logo and Desktop Links */}
          <div className="flex w-full justify-between items-center gap-8">
            <NavLink
              to={(role == "Seeker" && "/") || (role == "client" && "/client")}
              className="flex items-center gap-2 group"
            >
              <img
                src="/Logo.png"
                alt="JobHunt Logo"
                className="h-6 w-6 transition-transform group-hover:scale-110"
              />
              <h1 className="text-xl font-semibold text-gray-800">JobHunt</h1>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {links.map((link, i) => (
                <NavLink
                  key={i}
                  to={link.to}
                  end={link.name === "Home"}
                  className={({ isActive }) =>
                    `relative py-1 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-primary font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
                        : "text-gray-600 hover:text-primary"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              {user && (
                <NavLink
                  to={`${role == "Seeker" ? "seeker" : "client"}/profile`}
                  className="hidden sm:block"
                >
                  <img
                    src={
                      user.profilePic ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjNUOgjEhHpfUqnVk-Tp2uN1AhrrzXhwdX9A&s"
                    }
                    alt={user?.fullName.slice(0, 1)}
                    className="h-9 w-9 border border-gray-300 rounded-full "
                  />
                </NavLink>
              )}
            </div>
          </div>

          {/* Profile Buttons and Mobile Menu Toggle */}

          <div className="flex items-center  gap-4">
            {/* Mobile Menu Button */}
            <button
              className="menu-button md:hidden  rounded-md cursor-pointer text-gray-600 hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label="Toggle menu"
            >
              {isSidebarOpen ? <FiX size={24} /> : <RiMenu4Line size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`sidebar md:hidden   fixed inset-y-0 right-0 w-full pb-2 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full  px-2">
          {/* Sidebar Header */}
          <div className="flex justify-between  items-center h-[10dvh] border-b border-gray-200">
            <NavLink
              to="/"
              className="flex items-center gap-2"
              onClick={() => setIsSidebarOpen(false)}
            >
              <img src="/Logo.png" alt="JobHunt Logo" className="h-6 w-6" />
              <h1 className="text-xl font-semibold text-gray-800">JobHunt</h1>
            </NavLink>
            <button
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close menu"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto py-4 space-y-1">
            <NavLink
              to="/"
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <FiHome />
              <span>Home</span>
            </NavLink>

            {links.map((link, i) => (
              <NavLink
                key={i}
                to={link.to}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="border-t border-gray-200 pt-4">
            {!user ? (
              <div className="space-y-2">
                <NavLink
                  to="/login"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-primary hover:bg-primary/10"
                >
                  <FiUser />
                  <span>Login</span>
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-white bg-primary hover:bg-primary/90"
                >
                  <span>Sign Up</span>
                </NavLink>
              </div>
            ) : (
              <NavLink
                to="/profile"
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-white bg-primary hover:bg-primary/90"
              >
                <FiUser />
                <span>Profile</span>
              </NavLink>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Nav;
