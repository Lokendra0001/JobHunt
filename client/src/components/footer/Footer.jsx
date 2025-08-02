import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../customHooks/useAuth";
import { Twitter } from "lucide-react";
import { FiLinkedin } from "react-icons/fi";
import { RiLinkedinBoxFill } from "react-icons/ri";
import Input from "../common/Input";

const Footer = () => {
  const { role } = useAuth();

  const getLinks = () => {
    const links = {
      Seeker: [
        { name: "Home", to: "/seeker" },
        { name: "Find Job", to: "/findJob" },
        { name: "Browse Project", to: "/browseProject" },
      ],
      Client: [
        { name: "Home", to: "/client" },
        { name: "Create Post", to: "/client/create-newProject" },
        { name: "All Proposals", to: "/client/allProposals" },
      ],
    };

    return links[role] || links.Seeker;
  };

  const links = getLinks();

  return (
    <footer className="bg-[#0f172a] text-gray-300">
      <div className="mx-auto px-4 py-5 max-w-7xl">
        {/* Main Content */}
        <div className="flex justify-between flex-wrap gap-5 mb-4">
          {/* Brand Info - Wider column */}
          <div className="md:col-span-5 lg:col-span-4">
            <NavLink
              to={(role == "Seeker" && "/") || (role == "client" && "/client")}
              className="flex items-center gap-3 group mb-4 w-fit"
            >
              <img
                src="/Logo.png"
                alt="JobHunt Logo"
                className="h-9 w-9 transition-transform group-hover:rotate-6"
              />
              <h1 className="text-3xl font-bold text-white">JobHunt</h1>
            </NavLink>
            <p className="text-gray-400 mb-6  leading-relaxed max-w-lg">
              Great platform for job seekers passionate about startups. Find
              your dream freelance project easier.
            </p>

            {/* Newsletter Subscription */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-3">
                Get job notifications
              </h3>
              <p className="text-gray-400 mb-4">
                The latest job news, articles, sent to your inbox weekly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-sm w-full">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="flex-grow px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none  text-white placeholder-gray-500"
                />
                <button className="bg-gradient-to-r from-blue-500 to-primary hover:from-blue-600 hover:to-primary-hover text-white px-4 py-1 rounded transition-all duration-300 ">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* About Links */}
          <div className="">
            <h3 className="text-xl font-semibold text-white mb-5 pb-2 border-b border-gray-700/50">
              About
            </h3>
            <ul className="space-y-2 ">
              {[
                "Companies",
                "Pricing",
                "Terms",
                "Advice",
                "Privacy Policy",
              ].map((item) => (
                <li
                  key={item}
                  className="w-fit hover:translate-x-1 transition-all"
                >
                  <NavLink
                    to="#"
                    className="text-gray-400 hover:text-primary-text transition-all duration-200"
                  >
                    {item}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Role-based Links */}
          <div className="md:col-span-4 lg:col-span-3">
            <h3 className="text-xl font-semibold text-white mb-5 pb-2 border-b border-gray-700/50">
              Direct links
            </h3>
            <ul className="space-y-3">
              {links.map((link, i) => (
                <li
                  key={i}
                  className="w-fit hover:translate-x-1 transition-all"
                >
                  <NavLink
                    to={link.to}
                    end={link.name === "Home"}
                    className={({ isActive }) =>
                      ` ${
                        isActive ? "text-white " : "text-gray-400"
                      } hover:text-primary-text transition-colors duration-200 flex items-center group`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-2 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 mb-4 md:mb-0">
            © 2025 JobHunt. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Twitter size={23} />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <RiLinkedinBoxFill size={25} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
