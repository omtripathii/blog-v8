import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const useGetBlog = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [blogDetails, setBlogDetails] = useState({});
  
  const token = localStorage.getItem("token");
  
  if (!token || token === "undefined" || token === "null") {
    console.log("No valid token found");
    navigate("/signin");
    return;
  }

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBlogDetails(response.data.blog);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog:", error);
        setLoading(false);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/signin");
        }
      });
  }, [id]);

  return { loading, blogDetails };
};
