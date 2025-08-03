import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Button, Input } from "../../components/common/Index";
import ProjectCard from "../../components/seeker/ProjectCard";
import { Axis3DIcon, Frown } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { serverObj } from "../../config/serverConfig";

const FindProjects = () => {
  const serverAPI = serverObj.serverAPI;
  // Sample project data
  // const projects = [
  //   {
  //     _id: 1,
  //     title: "React E-commerce Website",
  //     description:
  //       "Need a developer to build a complete e-commerce platform with React frontend and Node.js backend.",
  //     skills: ["React", "Node.js", "MongoDB"],
  //     minBudget: 2500,
  //     maxBudget: 3500,
  //     budgetType: "Fixed",
  //     category: "Web Development",
  //     client_id: "ShopMaster",
  //     proposals: 0,
  //     status: "Open",
  //     assignedFreelancerId: null,
  //     createdAt: "2025-08-01T10:00:00Z",
  //     updatedAt: "2025-08-01T10:00:00Z",
  //   },
  //   {
  //     _id: 2,
  //     title: "Mobile App UI Design",
  //     description:
  //       "Looking for a talented designer to create modern UI for our fitness tracking mobile application.",
  //     skills: ["Figma", "UI/UX", "Prototyping"],
  //     minBudget: 1200,
  //     maxBudget: 1800,
  //     budgetType: "Fixed",
  //     category: "UI/UX Design",
  //     client_id: "DesignLabs",
  //     proposals: 2,
  //     status: "Open",
  //     assignedFreelancerId: null,
  //     createdAt: "2025-07-30T09:30:00Z",
  //     updatedAt: "2025-07-30T09:30:00Z",
  //   },
  //   {
  //     _id: 3,
  //     title: "Python Data Analysis",
  //     description:
  //       "Need help analyzing customer data and creating visual reports using Python.",
  //     skills: ["Python", "Pandas", "Data Visualization"],
  //     minBudget: 800,
  //     maxBudget: 1200,
  //     budgetType: "Fixed",
  //     category: "Data Analysis",
  //     client_id: "DataInsights",
  //     proposals: 1,
  //     status: "In Progress",
  //     assignedFreelancerId: null,
  //     createdAt: "2025-07-28T11:15:00Z",
  //     updatedAt: "2025-07-28T11:15:00Z",
  //   },
  //   {
  //     _id: 4,
  //     title: "WordPress Blog Setup",
  //     description:
  //       "Set up a personal blog with WordPress and configure plugins for SEO.",
  //     skills: ["WordPress", "PHP", "SEO"],
  //     minBudget: 500,
  //     maxBudget: 800,
  //     budgetType: "Fixed",
  //     category: "Web Development",
  //     client_id: "BlogWorld",
  //     proposals: 3,
  //     status: "In Progress",
  //     assignedFreelancerId: null,
  //     createdAt: "2025-07-25T14:00:00Z",
  //     updatedAt: "2025-07-25T14:00:00Z",
  //   },
  //   {
  //     _id: 5,
  //     title: "Flutter Food Delivery App",
  //     description:
  //       "Develop a cross-platform food delivery app using Flutter and Firebase backend.",
  //     skills: ["Flutter", "Firebase", "API Integration"],
  //     minBudget: 3000,
  //     maxBudget: 5000,
  //     budgetType: "Fixed",
  //     category: "Mobile App Development",
  //     client_id: "QuickEats",
  //     proposals: 0,
  //     status: "Open",
  //     assignedFreelancerId: null,
  //     createdAt: "2025-07-20T13:45:00Z",
  //     updatedAt: "2025-07-20T13:45:00Z",
  //   },
  //   {
  //     _id: 6,
  //     title: "Digital Marketing Campaign",
  //     description:
  //       "Plan and execute a 1-month digital marketing campaign for a fashion brand.",
  //     skills: ["SEO", "Google Ads", "Social Media Marketing"],
  //     minBudget: 1500,
  //     maxBudget: 2500,
  //     budgetType: "hourly",
  //     category: "Marketing",
  //     client_id: "FashionTrendz",
  //     proposals: 4,
  //     status: "Completed",
  //     assignedFreelancerId: null,
  //     createdAt: "2025-07-18T15:00:00Z",
  //     updatedAt: "2025-07-18T15:00:00Z",
  //   },
  //   {
  //     _id: 7,
  //     title: "Logo & Brand Identity",
  //     description:
  //       "Design a modern logo and brand identity kit for a tech startup.",
  //     skills: ["Logo Design", "Illustrator", "Branding"],
  //     minBudget: 300,
  //     maxBudget: 600,
  //     budgetType: "Fixed",
  //     category: "Graphic Design",
  //     client_id: "TechHive",
  //     proposals: 5,
  //     status: "Open",
  //     assignedFreelancerId: null,
  //     createdAt: "2025-07-15T09:10:00Z",
  //     updatedAt: "2025-07-15T09:10:00Z",
  //   },
  //   {
  //     _id: 8,
  //     title: "AI Chatbot Integration",
  //     description:
  //       "Integrate an AI-powered chatbot on our customer support website.",
  //     skills: ["Python", "NLP", "Dialogflow"],
  //     minBudget: 2000,
  //     maxBudget: 3500,
  //     budgetType: "Fixed",
  //     category: "AI & Machine Learning",
  //     client_id: "HelpDeskPro",
  //     proposals: 0,
  //     status: "Completed",
  //     assignedFreelancerId: null,
  //     createdAt: "2025-07-12T10:00:00Z",
  //     updatedAt: "2025-07-12T10:00:00Z",
  //   },
  //   {
  //     _id: 9,
  //     title: "YouTube Video Editing",
  //     description:
  //       "Edit 10 short YouTube videos with transitions and background music.",
  //     skills: ["Premiere Pro", "After Effects", "Video Editing"],
  //     minBudget: 400,
  //     maxBudget: 700,
  //     budgetType: "Fixed",
  //     category: "Video Editing",
  //     client_id: "VlogStar",
  //     proposals: 7,
  //     status: "Open",
  //     assignedFreelancerId: null,
  //     createdAt: "2025-07-10T16:30:00Z",
  //     updatedAt: "2025-07-10T16:30:00Z",
  //   },
  //   {
  //     _id: 10,
  //     title: "Laravel API Development",
  //     description:
  //       "Develop a RESTful API for our e-learning platform using Laravel.",
  //     skills: ["Laravel", "MySQL", "API Development"],
  //     minBudget: 1800,
  //     maxBudget: 2500,
  //     budgetType: "hourly",
  //     category: "Backend Development",
  //     client_id: "EduPro",
  //     proposals: 2,
  //     status: "Completed",
  //     assignedFreelancerId: null,
  //     createdAt: "2025-07-08T11:20:00Z",
  //     updatedAt: "2025-07-08T11:20:00Z",
  //   },
  //   {
  //     _id: 11,
  //     title: "Content Writing for Blog",
  //     description: "Write 20 SEO-optimized blog posts for a travel website.",
  //     skills: ["Content Writing", "SEO", "Keyword Research"],
  //     minBudget: 500,
  //     maxBudget: 900,
  //     budgetType: "Fixed",
  //     category: "Content Writing",
  //     client_id: "TravelBuddy",
  //     proposals: 8,
  //     status: "Open",
  //     assignedFreelancerId: null,
  //     createdAt: "2025-07-05T10:00:00Z",
  //     updatedAt: "2025-07-05T10:00:00Z",
  //   },
  //   {
  //     _id: 12,
  //     title: "Shopify Store Customization",
  //     description:
  //       "Customize an existing Shopify store and add payment gateway integration.",
  //     skills: ["Shopify", "Liquid", "JavaScript"],
  //     minBudget: 700,
  //     maxBudget: 1200,
  //     budgetType: "Fixed",
  //     category: "E-commerce",
  //     client_id: "GearUp",
  //     proposals: 3,
  //     status: "Open",
  //     assignedFreelancerId: null,
  //     createdAt: "2025-07-01T12:30:00Z",
  //     updatedAt: "2025-07-01T12:30:00Z",
  //   },
  // ];
  const [searchParams] = useSearchParams();
  const [originalProjects, setOriginalProject] = useState([]);
  const [filteredProject, setFilteredProject] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pagesPer = 8;
  const [noOfPages, setNoOfPages] = useState(
    Math.ceil(originalProjects.length / pagesPer)
  );

  const fetchAllProjects = async () => {
    try {
      const res = await axios.get(
        `${serverAPI}/freelancerProject/get-allProjects`,
        { withCredentials: true }
      );
      console.log(res);
      setOriginalProject(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const filterProjects = () => {
    let filtered = [...originalProjects];
    console.log(originalProjects);

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((project) =>
        project.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Search filter
    if (searchTerm.trim()) {
      const searchVal = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchVal) ||
          project.category.toLowerCase().includes(searchVal) ||
          project.skills.some((skill) =>
            skill.toLowerCase().includes(searchVal)
          )
      );
    }

    return filtered;
  };

  useEffect(() => {
    const filtered = filterProjects();

    // Get totalPages so do Pagination and show no of pages
    const totalPages = Math.ceil(filtered.length / pagesPer);

    // Paginate
    const firstIndex = (currentPage - 1) * pagesPer;
    const lastIndex = currentPage * pagesPer;
    setFilteredProject(filtered.slice(firstIndex, lastIndex));
    setNoOfPages(totalPages);

    // Scroll to top
    window.scrollTo({ top: 0 });
  }, [originalProjects, selectedCategory, searchTerm, currentPage]);

  useEffect(() => {
    setCurrentPage(1); // Reset page on filter change
  }, [selectedCategory, searchTerm]);

  return (
    <div className="bg-gray-50 min-h-screen py-3 sm:py-8  ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="sm:text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
            Find Your Next Freelance Project
          </h1>
          <p className="text-sm sm:text-base text-gray-600 ">
            Browse remote freelance projects matching your skills
          </p>
        </div>

        {/* Search Bar */}
        <div className=" flex justify-between gap-1 sm:gap-3 px-3 sm:p-4 rounded-lg  mb-8 w-full ">
          <div className="flex-grow">
            <Input
              type="text"
              icon={FiSearch}
              placeholder="Search projects (e.g. React, Design, Python)"
              className="py-3"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
          <Button className="bg-primary hover:bg-primary-hover text-white px-3 rounded-md transition-colors flex items-center justify-center ">
            <FiSearch size={20} />
            <span className="hidden md:block">Find Projects</span>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap  gap-3 mb-8">
          {[
            "All",
            "Development",
            "Design",
            "Digital Marketing",
            "Writing",
            "Data Science",
            "Virtual Assistant",
            "Data Analytics",
            "Customer Support",
            "Sales",
          ].map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === selectedCategory
                  ? "bg-indigo-100 text-indigo-800"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setSelectedCategory(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project Listings */}

        {filteredProject.length == 0 ? (
          <div className="flex py-30 flex-col items-center justify-center w-full text-center p-4">
            <div className="bg-indigo-50 border border-indigo-200 rounded-full p-4 mb-4">
              <Frown className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No projects available
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              There are currently no projects. Try different One!
            </p>
          </div>
        ) : (
          <div className="w-full grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 place-items-center">
            {filteredProject.map((project, i) => (
              <ProjectCard project={project} key={i} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <nav className="flex items-center space-x-2">
            <button
              className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-gray-50"
              onClick={() =>
                currentPage > 1 && setCurrentPage((prev) => prev - 1)
              }
            >
              Previous
            </button>
            {new Array(noOfPages).fill("_").map((page, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded-md ${
                  currentPage == i + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-50 text-primary border border-gray-300"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={() =>
                currentPage < noOfPages && setCurrentPage((prev) => prev + 1)
              }
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default FindProjects;
