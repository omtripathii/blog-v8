import { useState } from "react";
import type { SigninInput } from "@om.tripathi/medium-common";
import { Link } from "react-router-dom";
export const Signin = () => {
  const [form, setForm] = useState<SigninInput>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signin form submitted:", form);
    // TODO: Send this data to your backend API
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
