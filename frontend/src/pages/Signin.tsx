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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        form
      );
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      console.log("Signin form submitted:", form);
      navigate("/blogs");
    } catch (error) {
      alert("Something went Wrong PLease Try Again");
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
            className="w-full bg-black text-white font-medium py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
