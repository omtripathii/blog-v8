import { Avatar } from "./BlogCard";
import { useNavigate } from "react-router-dom";

export const Appbar = ({ authorName }: { authorName: string }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="flex justify-between items-center p-3 m-3 border-b rounded-2xl">
      <div className="w-1/20">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYW3LUmMsOVKVwHjPxKlOwg7wnv69hc2ByyQ&s"
          alt="Logo-img"
        />
      </div>
      <div className="flex items-center gap-5">
        <p>Hello {authorName}</p>
        <Avatar name={authorName} size={45} />
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
