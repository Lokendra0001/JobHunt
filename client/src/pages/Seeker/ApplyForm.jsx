import React, { useState } from "react";
import { Button, Input } from "../../components/common/Index";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiDollarSign,
  FiClock,
  FiEdit,
} from "react-icons/fi";
import { useForm } from "react-hook-form";
import { ChevronLeft, IndianRupee, Loader2 } from "lucide-react";
import axios from "axios";
import { serverObj } from "../../config/serverConfig";
import { useNavigate, useParams } from "react-router-dom";
import { handleSuccessMsg, handleErrorMsg } from "../../config/toast";

const ApplyForm = () => {
  const { id } = useParams("id");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApplyFormSubmit = async (data) => {
    setIsSubmitting(true);
    console.log(data);
    try {
      const res = await axios.patch(
        `${serverObj.serverAPI}/freelancerProject/add-seeker-proposal`,
        { ...data, projectId: id },
        { withCredentials: true }
      );
      if (res.data.message) {
        handleSuccessMsg(res.data.message);
        const projectId = res.data.projectId;
        const added = await axios.patch(
          `${serverObj.serverAPI}/user/add-projectId`,
          { projectId },
          { withCredentials: true }
        );
        console.log(added);
        reset();
      } else {
        handleErrorMsg(res.data.error);
      }
    } catch (err) {
      console.log(err);
      handleErrorMsg(err?.response?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white select-none rounded-lg my-4 shadow-sm border border-gray-300 p-6 max-w-3xl mx-auto relative">
      {/* Back Button */}
      <button
        className="flex relative  mb-4 z-30 xl:absolute xl:top-0 xl:-left-60 text-gray-500 font-medium"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft />
        Back
      </button>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <FiEdit className="mr-2 text-indigo-600" />
        Freelance Application Form
      </h2>

      <form onSubmit={handleSubmit(handleApplyFormSubmit)}>
        <div className="space-y-5">
          {/* Personal Information Section */}
          <div className="border-b border-gray-200 pb-5">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <Input
                  type="text"
                  placeholder="John Doe"
                  icon={FiUser}
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: { value: 3, message: "Min 3 characters" },
                  })}
                  error={errors.fullName?.message}
                />
              </div>

              {/* Email */}
              <div>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  icon={FiMail}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      message: "Invalid email",
                    },
                  })}
                  error={errors.email?.message}
                />
              </div>

              {/* Mobile */}
              <div>
                <Input
                  type="tel"
                  placeholder="+1 234 567 890"
                  icon={FiPhone}
                  {...register("mobile", {
                    required: "Mobile number is required",
                    pattern: {
                      value: /^[0-9+\s-]{7,15}$/,
                      message: "Invalid mobile number",
                    },
                  })}
                  error={errors.mobile?.message}
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender <span className="text-indigo-600">*</span>
                </label>
                <div className="flex space-x-4">
                  {["Male", "Female", "Other"].map((option) => (
                    <label key={option} className="inline-flex items-center">
                      <input
                        type="radio"
                        value={option}
                        {...register("gender", { required: "Select gender" })}
                        className="h-4 w-4  accent-primary text-primary border-gray-300 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information Section */}
          <div className="border-b border-gray-200 pb-5">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Professional Information
            </h3>

            {/* Current Status */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Status <span className="text-indigo-600">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Student", "Employed", "Freelancer", "Unemployed"].map(
                  (status) => (
                    <label
                      key={status}
                      className="flex items-center p-3 border border-gray-300 rounded-md hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                    >
                      <Input
                        type="radio"
                        value={status}
                        {...register("currentStatus", {
                          required: "Select current status",
                        })}
                        className="h-4 w-4 accent-primary text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-gray-700">{status}</span>
                    </label>
                  )
                )}
              </div>
              {errors.currentStatus && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.currentStatus.message}
                </p>
              )}
            </div>

            {/* Bid Amount */}
            <div>
              <Input
                label="Bid Amount *"
                type="number"
                placeholder="e.g : 1200..."
                icon={IndianRupee}
                {...register("bidAmount", {
                  required: "Bid amount is required",
                  min: { value: 1, message: "Must be greater than 0" },
                })}
                error={errors.bidAmount?.message}
                className={
                  "appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0"
                }
              />
            </div>
          </div>

          {/* Project Details Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Project Details
            </h3>

            {/* Delivery Time */}
            <div className="mb-4">
              <Input
                type="text"
                label="Delivery Time *"
                placeholder="e.g., 2 weeks, 1 month"
                icon={FiClock}
                {...register("deliveryTime", {
                  required: "Delivery time is required",
                })}
                error={errors.deliveryTime?.message}
              />
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Letter <span className="text-indigo-600">*</span>
              </label>
              <textarea
                rows={6}
                {...register("coverLetter", {
                  required: "Cover letter is required",
                  maxLength: { value: 2000, message: "Max 2000 characters" },
                })}
                placeholder="Explain why you're the best fit for this freelance project.."
                className={`w-full rounded-md border px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                  errors.coverLetter ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.coverLetter && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.coverLetter.message}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500 text-right">
                {watch("coverLetter")?.length || 0}/2000 characters
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className={`w-full py-3 text-lg text-white  flex items-center justify-center ${
                isSubmitting
                  ? "bg-primary/70 cursor-not-allowed"
                  : "bg-primary hover:bg-primary-hover cursor-pointer"
              } `}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ApplyForm;
