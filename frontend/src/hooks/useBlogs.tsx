import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const useBlogs = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log('Token from localStorage:', token); // Debug log
    
    if (!token || token === 'undefined' || token === 'null') {
      console.log("No valid token found");
      setLoading(false);
      navigate("/signin");
      return;
    }
    
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log('Blogs response:', response.data); // Debug log
        setBlogs(response.data.blogs);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/signin");
        }
      });
  }, [navigate]);

  return { loading, blogs };
};
