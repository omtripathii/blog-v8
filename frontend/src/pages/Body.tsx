import { Appbar } from "../components/Appbar";
import { useUser } from "../hooks/useUser";

interface BodyProps {
  children: React.ReactNode;
  showAppbar?: boolean; // Add optional prop to control Appbar rendering
}

export const Body = ({ children, showAppbar = true }: BodyProps) => {
  const { userDetails } = useUser();
  
  return (
    <div>
      {showAppbar && (
        <Appbar authorName={userDetails.name ? userDetails.name : "Anonymous"} />
      )}
      <main className={showAppbar ? "pt-4" : ""}>{children}</main>
    </div>
  );
};
