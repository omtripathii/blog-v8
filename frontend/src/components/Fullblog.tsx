import { useState } from "react";
import { Avatar } from "./BlogCard";
interface PropsType {
  authorName: string;
  title: string;
  content: string;
}
export const FullBlog = ({ authorName, title, content }: PropsType) => {
  const [loading, setLoading] = useState(false);

  // --- Fallback/Loading State (Kept as before) ---
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex justify-center pt-24 px-4">
          <div className="max-w-screen-xl w-full px-4 md:px-8">
            <div className="max-w-screen-md mx-auto">
              <div className="animate-pulse space-y-4">
                <div className="h-10 bg-gray-200 rounded w-full mb-6"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="pt-10 space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-11/12"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-10/12"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Rendered Blog Content (Fixes Applied) ---
  return (
    <div className="flex justify-center bg-white min-h-screen">
      <div className="grid grid-cols-12 max-w-screen-xl w-full pt-12 px-4 md:px-8 lg:pt-20">
        {/* Main Content Column */}
        <div className="col-span-12 lg:col-span-8 flex flex-col lg:pr-10 xl:pr-16">
          {/* FIX: Added 'break-words' to force long titles to wrap */}
          <div className="text-4xl md:text-5xl font-extrabold font-serif text-gray-900 leading-tight mb-4 break-words">
            {title}
          </div>
          <div className="text-gray-500 mb-8 text-base">
            Published on: 20th May 2024
          </div>
          {/* FIX: Added 'break-words' to force long content strings to wrap */}
          <div className="text-lg text-gray-800 leading-relaxed font-light whitespace-pre-wrap break-words">
            {content}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="col-span-12 lg:col-span-4 mt-10 lg:mt-0 lg:pl-10">
          <div className="sticky top-20">
            <p className="text-lg font-semibold text-gray-700 mb-4">Author</p>
            <div className="flex items-center gap-4">
              <Avatar name={authorName} size={60} />
              <div>
                <div className="text-xl font-bold text-gray-900 mb-1">
                  {authorName}
                </div>
                <div className="text-sm text-gray-500 italic">
                  The author's bio or a brief description about them.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
