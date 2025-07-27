import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../common/Index";

const Nav = () => {
  const links = [
    { name: "Find Job", to: "/findJob" },
    { name: "Browse Companies", to: "/browseCompanies" },
  ];

  return (
    <nav className="px-4 w-full  bg-background backdrop-blur-md py-3  border-b border-gray-100  sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left - Logo and Links */}
        <div className="flex items-center gap-6">
          {/* Logo with subtle hover effect */}
          <NavLink to="/" className="flex items-center gap-1 group">
            <img
              src="/Logo.png"
              alt="JobHunt Logo"
              className="h-6 w-6 transition-transform group-hover:scale-110"
            />
            <h1 className="text-xl font-[Roboto-SemiBold] text-zinc-600">
              JobHunt
            </h1>
          </NavLink>

          {/* Navigation Links with animated underline */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link, i) => (
              <NavLink
                key={i}
                to={link.to}
                className={({ isActive }) =>
                  `relative py-1 text-sm  font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-primary font-semibold border-b-2 border-primary "
                      : "text-gray-600 hover:text-primary"
                  }`
                }
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-indigo-600 transition-all duration-300 `}
                ></span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Right - Buttons with enhanced styling */}
        <div className="flex items-center gap-4">
          <NavLink to="/login">
            <Button
              btnName="Login"
              className="bg-transparent border-r border-gray-200 text-primary hover:text-primary-hover px-5 
              py-1.5 rounded-lg font-medium cursor-pointer"
            />
          </NavLink>
          <NavLink to="/signup">
            <Button
              btnName="Signup"
              className="bg-primary hover:bg-primary-hover cursor-pointer text-white px-4 py-1.5 rounded-sm font-medium "
            />
          </NavLink>
        </div>
      </div>

      {/* Mobile menu (simplified toggle version) */}
      <div className="md:hidden flex justify-center space-x-4 mt-4 pt-4 border-t border-gray-200">
        {links.map((link, i) => (
          <NavLink
            key={i}
            to={link.to}
            className={({ isActive }) =>
              `px-4 py-2 text-sm rounded-lg font-medium ${
                isActive
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
