import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const useUser = () => {
  type UserDetail = {
    name?: string;
    email?: string;
  };
  const [userDetails, setUserdetails] = useState<UserDetail>({});
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log('Token from localStorage:', token); // Debug log
    
    if (!token || token === 'undefined' || token === 'null') {
      console.log("No valid token found");
      return;
    }

    axios
      .get(`${BACKEND_URL}/api/v1/blog/userDetails`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log('User details response:', response.data); // Debug log
        setUserdetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        // If token is invalid, clear it
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
        }
      });
  }, []);
  
  return { userDetails };
};
