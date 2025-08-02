import React from "react";
import { useForm } from "react-hook-form";
import {
  Briefcase,
  DollarSign,
  Clock,
  X,
  Check,
  Tag,
  List,
  FileText,
  Code,
  Smartphone,
  PenTool,
  Type,
  BarChart2,
  Headphones,
  Film,
  Book,
  Globe,
  IndianRupee,
} from "lucide-react";
import { Input, Select, Button } from "../../components/common/Index";
import axios from "axios";
import { serverObj } from "../../config/serverConfig";

const NewProject = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();
  const serverAPI = serverObj.serverAPI;

  const budgetType = watch("budgetType");
  const skills = watch("skills");
  const category = watch("category");

  const budgetTypeOptions = ["Fixed", "Hourly"];

  const categoryOptions = [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "Content Writing",
    "Digital Marketing",
    "Virtual Assistant",
    "Data Analytics",
    "Customer Support",
    "Sales",
    "Other",
  ];

  const handleAddSkill = () => {
    const currentSkill = watch("currentSkill");
    if (currentSkill && !skills.includes(currentSkill)) {
      setValue("skills", [...skills, currentSkill]);
      setValue("currentSkill", "");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setValue(
      "skills",
      skills.filter((skill) => skill !== skillToRemove)
    );
  };

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(`${serverAPI}/freelancerProject/create-project`, data, {
        withCredentials: true,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
      {/* Header with Gradient Background */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 mb-8 text-white">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-full">
            <Briefcase size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Post a New Project
            </h1>
            <p className="text-indigo-100">
              Find the perfect freelancer for your job
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Project Title */}
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
          <Input
            label="Project Title *"
            icon={FileText}
            placeholder="e.g., Build a responsive e-commerce website"
            {...register("title", { required: "Project title is required" })}
            error={errors.title?.message}
          />
        </div>

        {/* Project Description */}
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
          <label className=" text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <FileText size={18} className="text-indigo-600" />
            Project Description *
          </label>
          <textarea
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none  bg-white"
            placeholder="Describe your project in detail..."
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 50,
                message: "Description should be at least 50 characters",
              },
            })}
          />
          {errors.description && (
            <p className="mt-2 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Budget Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Budget Type */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <Select
              label="Budget Type *"
              options={budgetTypeOptions}
              {...register("budgetType", { required: true })}
              icon={DollarSign}
              variant="filled"
            />
          </div>

          {/* Budget Range */}
          <div className="bg-gray-50 p-5  py-3 rounded-xl border border-gray-200">
            <label className="text-sm  font-semibold text-zinc-700 ">
              {budgetType === "Fixed" ? "Project Budget *" : "Hourly Rate *"}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mt-2">
              {/* Min Budget */}
              <Input
                className="w-full"
                type="text"
                icon={IndianRupee}
                placeholder={
                  budgetType === "Fixed" ? "Minimum budget" : "Minimum rate"
                }
                {...register("minBudget", {
                  required: "This field is required",
                  validate: (value) => {
                    const num = parseInt(value.replace(/,/g, ""), 10);
                    return num > 0 || "Value must be greater than 0";
                  },
                })}
                error={errors.minBudget?.message}
                variant="filled"
                onInput={(e) => {
                  const raw = e.target.value
                    .replace(/,/g, "")
                    .replace(/\D/g, "");
                  e.target.value = raw
                    ? Number(raw).toLocaleString("en-IN")
                    : "";
                  setValue("minBudget", e.target.value, {
                    shouldValidate: true,
                  });
                }}
              />

              {/* Max Budget */}
              <Input
                type="text"
                className={"w-full "}
                icon={IndianRupee}
                placeholder={
                  budgetType === "Fixed" ? "Maximum budget" : "Maximum rate"
                }
                {...register("maxBudget", {
                  required: "This field is required",
                  validate: (value) => {
                    const min = parseInt(
                      (watch("minBudget") || "0").replace(/,/g, ""),
                      10
                    );
                    const max = parseInt((value || "0").replace(/,/g, ""), 10);
                    if (isNaN(max) || max <= 0)
                      return "Value must be greater than 0";
                    if (max < min) return "Max must be greater than Min";
                    return true;
                  },
                })}
                error={errors.maxBudget?.message}
                variant="filled"
                onInput={(e) => {
                  const raw = e.target.value
                    .replace(/,/g, "")
                    .replace(/\D/g, "");
                  e.target.value = raw
                    ? Number(raw).toLocaleString("en-IN")
                    : "";
                  setValue("maxBudget", e.target.value, {
                    shouldValidate: true,
                  });
                }}
              />
            </div>
          </div>
        </div>

        {/* Category & Skills Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <Select
              label="Project Category *"
              options={categoryOptions}
              {...register("category", { required: "Category is required" })}
              error={errors.category?.message}
              icon={List}
              variant="filled"
            />
            {category === "Other" && (
              <div className="mt-4">
                <Input
                  placeholder="Specify your category"
                  {...register("otherCategory", {
                    required:
                      category === "Other" ? "Please specify category" : false,
                  })}
                  error={errors.otherCategory?.message}
                  variant="filled"
                />
              </div>
            )}
          </div>

          {/* Skills */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <label className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Tag size={18} className="text-indigo-600" />
              Required Skills *
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="Add skills (e.g., React, Photoshop)"
                {...register("currentSkill")}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddSkill())
                }
                variant="filled"
              />
              <Button
                type="button"
                onClick={handleAddSkill}
                variant="secondary"
                className="whitespace-nowrap bg-indigo-200 hover:bg-indigo-300 text-zinc-800 px-3"
              >
                Add Skill
              </Button>
            </div>
            <input type="hidden" {...register("skills")} />

            {/* Selected Skills */}
            {skills?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1.5 rounded-full text-sm font-medium"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 text-indigo-600 hover:text-indigo-800"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.skills && (
              <p className="mt-2 text-sm text-red-600">
                {errors.skills.message}
              </p>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={() => reset()}
            className="px-6 py-3 bg-red-400 hover:bg-red-500 text-white"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="px-6 py-3 shadow-lg shadow-indigo-100 hover:shadow-indigo-200 bg-primary hover:bg-primary-hover text-primary-text"
          >
            <Check size={18} className="mr-2" />
            Post Project
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewProject;
