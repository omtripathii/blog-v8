import { BlogCard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks/useBlogs";
import { useUser } from "../hooks/useUser";

export const Blogs = () => {
  const { userDetails } = useUser();
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <h1>Loading Contents</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-xl m-3 p-2 ">
      <div className="mb-5">
        <Appbar
          authorName={userDetails.name ? userDetails.name : "Anonymous"}
        />
      </div>
      <div className="mb-3">
        {blogs.map((item: any, index: number) => {
          return (
            <BlogCard
              key={item.id || index}
              authorName={item.user?.name}
              publishedDate="20-05-2024"
              title={item.title}
              content={item.content}
            />
          );
        })}
      </div>
    </div>
  );
};
