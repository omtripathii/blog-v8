import { useParams } from "react-router-dom";
import { FullBlog } from "../components/Fullblog";
import { useGetBlog } from "../hooks/useGetBlog";

export const Blog = () => {
  const { id } = useParams<{ id: string }>();

  // Handle case where id is undefined
  if (!id) {
    return <div>Invalid blog ID</div>;
  }

  const result = useGetBlog({ id });

  // Handle case where useGetBlog returns undefined (no token)
  if (!result) {
    return <div>Redirecting to login...</div>;
  }

  const { loading, blogDetails } = result;

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

  return (
    <div>
      <FullBlog
        authorName={blogDetails?.user?.name || "Anonymous"}
        title={blogDetails?.title || "Loading..."}
        content={blogDetails?.content || "Loading content..."}
      />
    </div>
  );
};
