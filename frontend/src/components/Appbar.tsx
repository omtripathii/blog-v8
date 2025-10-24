import { Avatar } from "./BlogCard";
export const Appbar = ({ authorName }: { authorName: string }) => {
  return (
    <div className="flex justify-between items-center p-3 m-3 border-b rounded-2xl">
      <div className="w-1/20">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYW3LUmMsOVKVwHjPxKlOwg7wnv69hc2ByyQ&s"
          alt="Logo-img"
        />
      </div>
      <div>
        <p>Hello {authorName}</p>
        <Avatar name={authorName} size={45} />
      </div>
    </div>
  );
};
