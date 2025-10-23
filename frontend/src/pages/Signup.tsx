import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { SignupInput } from "@om.tripathi/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
export const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<SignupInput>({
    name: "",
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
        `${BACKEND_URL}/api/v1/user/signup`,
        form
      );
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      console.log("Signup form submitted:", form);
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
        <h1 className="text-2xl font-semibold mb-2 text-center">
          Create an account
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Already have an account?{" "}
          <Link to="/signin" className="underline text-black font-medium">
            Login
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
