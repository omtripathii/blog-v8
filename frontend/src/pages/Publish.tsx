import { useState } from "react";
import { Appbar } from "../components/Appbar";
import { useUser } from "../hooks/useUser";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { userDetails } = useUser();

  const handlePublishSuccess = () => {
    // Clear the form if   publish
    setTitle("");
    setContent("");
  };

  return (
    <div className="min-h-screen bg-white">
      <Appbar
        authorName={userDetails.name ? userDetails.name : "Anonymous"}
        blogTitle={title}
        blogContent={content}
        onPublishSuccess={handlePublishSuccess}
      />

      <div className="flex justify-center pt-16 px-4 md:px-8">
        <div className="max-w-screen-md w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full text-5xl md:text-7xl font-extrabold font-serif text-gray-900 placeholder:text-gray-300 focus:outline-none mb-10 border-none p-0"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tell your story..."
            rows={15}
            className="w-full resize-none text-2xl font-light leading-relaxed text-gray-800 placeholder:text-gray-400 focus:outline-none border-none p-0"
            style={{ minHeight: "60vh" }}
          />
        </div>
      </div>
    </div>
  );
};
