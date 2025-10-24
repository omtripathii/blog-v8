import { BlogCard } from "../components/BlogCard";

import { useBlogs } from "../hooks/useBlogs";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex justify-center pt-24 px-4">
          <div className="max-w-screen-md w-full">
            {/* FallBack Ui*/}
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5 mb-8"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-300 rounded-full w-40 mt-10"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex justify-center mb-3">
        <div className="max-w-screen-md w-full py-10 px-4 ">
          {blogs.map((item: any, index: number) => {
            return (
              <div className="m-2">
                <BlogCard
                  key={item.id || index}
                  id={item.id}
                  authorName={item.user?.name || "Anonymous"}
                  publishedDate="20-05-2024"
                  title={item.title}
                  content={item.content}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
