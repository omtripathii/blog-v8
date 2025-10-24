import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useUser = () => {
  const navigate = useNavigate();
  type UserDetail = {
    name?: string;
    email?: string;
  };
  const [userDetails, setUserdetails] = useState<UserDetail>({});
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token || token === 'undefined' || token === 'null') {
      console.log("No valid token found");
      navigate("/signin");
      return;
    }

    axios
      .get(`${BACKEND_URL}/api/v1/blog/userDetails`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserdetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        // If token is invalid, clear it and redirect
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/signin");
        }
      });
  }, [navigate]);
  
  return { userDetails };
};
