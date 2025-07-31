import React from "react";
import {
  Search,
  Briefcase,
  MapPin,
  ChevronDown,
  Rocket,
  Star,
  BarChart2,
  Zap,
  MoveRight,
  PencilRuler,
  Code2,
  PenSquare,
  Laptop,
  Hammer,
  ChevronRight,
  User2Icon,
  AlignHorizontalJustifyStartIcon,
  BarChart2Icon,
  PieChart,
} from "lucide-react";
import Select from "../../components/common/Select";
import cities from "indian-cities-json";
import Input from "../../components/common/Input";
import { NavLink } from "react-router-dom";

const Home = () => {
  const popularJobs = [
    "Frontend Developer",
    "UX Designer",
    "Data Scientist",
    "Product Manager",
    "DevOps Engineer",
  ];

  const allCategory = [
    {
      icon: <PencilRuler />,
      name: "Design",
      availableJob: (
        <>
          235 jobs available{" "}
          <ChevronRight
            className="text-gray-400 group-hover:text-gray-300"
            size={20}
          />
        </>
      ),
    },
    {
      icon: <Code2 />,
      name: "Development",
      availableJob: (
        <>
          421 jobs available{" "}
          <ChevronRight
            className="text-gray-400 group-hover:text-gray-300"
            size={20}
          />
        </>
      ),
    },
    {
      icon: <PenSquare />,
      name: "Content Writing",
      availableJob: (
        <>
          178 jobs available{" "}
          <ChevronRight
            className="text-gray-400 group-hover:text-gray-300"
            size={20}
          />
        </>
      ),
    },
    {
      icon: <Briefcase />,
      name: "Marketing",
      availableJob: (
        <>
          310 jobs available{" "}
          <ChevronRight
            className="text-gray-400 group-hover:text-gray-300"
            size={20}
          />
        </>
      ),
    },
    {
      icon: <Laptop />,
      name: "Virtual Assistant",
      availableJob: (
        <>
          129 jobs available{" "}
          <ChevronRight
            className="text-gray-400 group-hover:text-gray-300"
            size={20}
          />
        </>
      ),
    },
    {
      icon: <PieChart />,
      name: "Data Analytics",
      availableJob: (
        <>
          295 jobs available{" "}
          <ChevronRight
            className="text-gray-400 group-hover:text-gray-300"
            size={20}
          />
        </>
      ),
    },
    {
      icon: <User2Icon />,
      name: "Customer Support",
      availableJob: (
        <>
          198 jobs available{" "}
          <ChevronRight className="text-gray-400" size={20} />
        </>
      ),
    },
    {
      icon: <AlignHorizontalJustifyStartIcon />,
      name: "Sales",
      availableJob: (
        <>
          156 jobs available{" "}
          <ChevronRight className="text-gray-400" size={20} />
        </>
      ),
    },
  ];

  const options = cities.cities.slice(0, 100).map((city, i) => {
    return `${city.name}, ${city.state}`;
  });

  return (
    <div className="min-h-screen  py-12 select-none w-full overflow-hidden">
      {/* Hero Section */}
      <div>
        {/* Hero Text Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6 shadow-sm animate-pulse">
            <Rocket className="h-4 w-4 mr-2" />
            Find your dream job today
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="block opacity-0 animate-fadeIn">Discover</span>
            <span className="block text-indigo-600 opacity-0 animate-fadeIn animation-delay-500">
              <span className="relative inline-block">
                More Than
                <span className="absolute bottom-0 left-0 w-full h-2 bg-indigo-200 opacity-50 -z-10 transform -rotate-1"></span>
              </span>
            </span>
            <span className="block opacity-0 animate-fadeIn animation-delay-1000">
              <span className="relative">
                5000+ Jobs
                <span className="absolute -right-8 -top-4">
                  <span className="relative flex h-6 w-6">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-6 w-6 bg-yellow-600 items-center justify-center">
                      <Zap className="h-3 w-3 text-white" />
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 opacity-0 animate-fadeIn animation-delay-1500">
            The{" "}
            <span className="font-semibold text-indigo-600">
              greatest platform
            </span>{" "}
            for tech talents and innovative companies to connect and grow
            together.
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 max-w-4xl mx-auto mb-16">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 -top-2 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                className="block w-full  pl-10  overflow-hidden rounded-lg  
                 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Job title, keywords, or company"
              />
            </div>

            <div className="relative flex-1 ">
              <div className="absolute inset-y-0 -top-2 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <Select
                defaultValue="Select location"
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg bg-gray-50  appearance-none mt-0"
                options={options}
              />

              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>

            <button className="h-fit bg-indigo-600  hover:bg-indigo-700 text-white px-5 py-2.5   rounded-md font-medium flex items-center justify-center transition-colors duration-200 shadow-sm">
              {/* <Search className="h-5 w-5 mr-2" /> */}
              Find Jobs
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-4 flex items-center flex-wrap">
            <span className="mr-2">Popular jobs:</span>
            {popularJobs.map((job, index) => (
              <React.Fragment key={job}>
                <span className="text-indigo-600 hover:text-indigo-800">
                  {job}
                </span>
                {index < popularJobs.length - 1 && (
                  <span className="mx-1">•</span>
                )}
              </React.Fragment>
            ))}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-indigo-100 mr-4">
                <Rocket className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">1000+</p>
                <p className="text-gray-500">Tech Jobs</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <Briefcase className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">500+</p>
                <p className="text-gray-500">Remote Jobs</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-purple-100 mr-4">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">250+</p>
                <p className="text-gray-500">Startup Jobs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Section */}
      <div className="bg-white">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold  text-gray-900">
            Explore by <span className="text-primary">Category</span>
          </h1>
          <NavLink className="flex items-center mt-7 gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
            Show all jobs <MoveRight className="w-5 h-5" />
          </NavLink>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {allCategory.map((category, i) => (
            <NavLink
              to={`/findjob?category=${category.name}`}
              key={i}
              className="bg-white hover:bg-primary hover:text-primary-text p-6 rounded-xl  border border-primary-border transition-all  hover:-translate-y-1 group cursor-default"
            >
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-indigo-50  text-indigo-600">
                  {category.icon}
                </div>
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold ">{category.name}</h2>
                  <p className="text-sm text-gray-500 group-hover:text-gray-300 flex gap-2">
                    {category.availableJob}
                  </p>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
