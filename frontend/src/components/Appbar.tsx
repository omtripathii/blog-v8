import { useEffect, useState } from "react";
import { Avatar } from "./BlogCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { SuccessToast } from "./SuccessToast";

interface AppbarProps {
  authorName: string;
  blogTitle?: string;
  blogContent?: string;
  onPublishSuccess?: () => void;
}

export const Appbar = ({
  authorName,
  blogTitle = "",
  blogContent = "",
  onPublishSuccess,
}: AppbarProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const isPublishPage = location.pathname === "/publish";

  const handlePublish = async () => {
    const token = localStorage.getItem("token");

    if (!token || token === "undefined" || token === "null") {
      console.log("No valid token found");
      navigate("/signin");
      return;
    }

    // Validate blog content
    if (!blogTitle.trim() || !blogContent.trim()) {
      setToastMessage("Please fill in both title and content before publishing");
      setShowToast(true);
      return;
    }

    setIsPublishing(true);

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/blog/create`,
        {
          title: blogTitle,
          content: blogContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setToastMessage("Blog published successfully!");
      setShowToast(true);
      if (onPublishSuccess) {
        onPublishSuccess();
      }
      setTimeout(() => {
        navigate("/blogs");
      }, 2000);
    } catch (error) {
      console.error("Publishing error:", error);
      setToastMessage("Something went wrong. Please try again.");
      setShowToast(true);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <>
      <header className="flex justify-between items-center px-3 md:px-10 py-3 border-b border-gray-200 bg-white sticky top-0 z-50 transition-all duration-300">
        {/* Logo/Brand Section - Clean and minimalist */}
        <div
          className="flex items-center cursor-pointer "
          onClick={() => navigate("/blogs")}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYW3LUmMsOVKVwHjPxKlOwg7wnv69hc2ByyQ&s"
            alt="App Logo"
            className="w-20 h-20 rounded-full"
          />

          <div className="text-3xl font-serif font-bold tracking-tight text-gray-900">
            Blog-V8
          </div>
        </div>

        {/* Action and User Section */}
        <div className="flex items-center gap-6">
          {/* Write Button - Green for action, like Medium */}

          {isPublishPage ? (
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className={`text-white font-medium py-2 px-4 rounded-full transition ${
                isPublishing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-700 hover:bg-green-800"
              }`}
            >
              {isPublishing ? "Publishing..." : "Publish"}
            </button>
          ) : (
            <button
              onClick={() => navigate("/publish")}
              className="bg-green-700 hover:bg-green-800 text-white font-medium text-sm py-2 px-4 rounded-full transition duration-200 ease-in-out shadow-sm hidden sm:block"
            >
              Write
            </button>
          )}
          {/* User Avatar and Dropdown */}
          <div className="relative">
            <div
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 cursor-pointer p-1 rounded-full"
            >
              <p className="text-gray-600 font-medium hidden sm:block text-sm">
                <span className="font-semibold text-gray-800">
                  Hi, {authorName}
                </span>
              </p>
              <Avatar name={authorName} size={40} />
            </div>

            {open && (
              <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden py-1 z-10">
                <button
                  onClick={() => navigate("/publish")}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 sm:hidden"
                >
                  Write a Story
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Toast notification */}
      {showToast && (
        <SuccessToast
          message={toastMessage}
          duration={3000}
        />
      )}
    </>
  );
};
