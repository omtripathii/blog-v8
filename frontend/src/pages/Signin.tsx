import { useState } from "react";
import type { SigninInput } from "@om.tripathi/medium-common";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";
export const Signin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<SigninInput>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        form
      );
      console.log('Full response:', response.data); // Debug log
      
      // Check if the response contains a token
      if (response.data.token) {
        const jwt = response.data.token; 
        console.log('Token received:', jwt); // Debug log
        localStorage.setItem("token", jwt);
        console.log('Token stored in localStorage:', localStorage.getItem("token")); // Debug log
        navigate("/blogs");
      } else {
        // Handle case where signin was successful but no token
        console.error('No token in response:', response.data);
        alert("Signin failed: No token received");
        setLoading(false);
      }
    } catch (error: any) {
      console.error('Signin error:', error);
      // Better error handling
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert("Something went Wrong Please Try Again");
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="w-[400px] bg-white p-8 rounded-2xl shadow-md">
        <div className="ml-[25%] w-1/2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYW3LUmMsOVKVwHjPxKlOwg7wnv69hc2ByyQ&s"
            alt="Logo-img"
          />
        </div>
        <p className="text-gray-500 text-center mb-6">
          Don't have an account?{" "}
          <Link to="/signup" className="underline text-black font-medium">
            Create Account
          </Link>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="m@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-black text-white font-medium py-2 rounded-lg transition ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-800'}`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};
