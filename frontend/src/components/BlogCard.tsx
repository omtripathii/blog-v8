import { useNavigate } from "react-router-dom";

interface PropsType {
  authorName: string;
  publishedDate: string;
  title: string;
  content: string;
  id: string;
}

export const BlogCard = ({
  authorName,
  publishedDate,
  title,
  content,
  id,
}: PropsType) => {
  const navigate = useNavigate();
  const wordCount = content.length / 5;
  const readingTime = Math.ceil(wordCount / 200);
  function handleonClick() {
    navigate(`/blog/${id}`);
  }
  return (
    <div
      onClick={handleonClick}
      className="
        w-full p-6 cursor-pointer border border-slate-200 rounded-2xl
        hover:shadow-md hover:border-slate-300 transition-all duration-200 ease-in-out
        bg-white
      "
    >
      <div className="flex items-center space-x-3 pb-3">
        <Avatar name={authorName} />
        <div className="flex items-center text-sm text-slate-600">
          <span className="font-semibold text-slate-800">
            {authorName ? authorName : "Anonymous"}
          </span>
          <DotSeparator />
          <span className="text-slate-500">{publishedDate}</span>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 leading-snug mb-2">
        {title}
      </h2>
      <p className="text-base text-slate-600 leading-relaxed mb-4">
        {content.slice(0, 160) + "..."}
      </p>

      <div className="text-xs text-slate-500 tracking-wide">
        {readingTime === 0 ? "< 1" : readingTime} min read
      </div>
    </div>
  );
};

const DotSeparator = () => (
  <div className="mx-2 h-1 w-1 rounded-full bg-slate-400" />
);

interface AvatarProps {
  name?: string | "A";
  size?: number; // size in pixels
}

export function Avatar({ name, size = 32 }: AvatarProps) {
  const initial = name ? name[0].toUpperCase() : "A";

  return (
    <div
      className="flex items-center justify-center rounded-full bg-slate-100 border border-slate-300"
      style={{ width: size, height: size }}
    >
      <span
        className="font-semibold text-slate-700"
        style={{ fontSize: size * 0.4 }}
      >
        {initial}
      </span>
    </div>
  );
}
