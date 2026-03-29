import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaApple, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Something went wrong");
        setLoading(false);
        return;
      } else {
        setMessage("User created successfully");
        setLoading(false);
        setTimeout(() => {
          navigate("/sign-in");
        });
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100 px-4 overflow-hidden">
      {/* Main Container */}
      <div className="flex w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* LEFT SIDE - FORM */}
        <div className="w-full md:w-1/2 p-6 lg:p-10 flex flex-col justify-start bg-white overflow-y-auto">
          {/* Logo */}
          <div className="mb-2">
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-blue-900 uppercase">
              D Prime Assets
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">
                Real Estate Management
              </p>
            </div>
          </div>

          {/* Title */}
          <div className="mb-2">
            <h2 className="text-2xl font-semibold mb-1">Create Your Account</h2>
            <p className="text-gray-500 mb-3">
              Start managing your properties today
            </p>
          </div>

          {/* Form */}
          <form className="space-y-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              id="username"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
              onChange={handleChange}
            />

            <input
              type="email"
              placeholder="Email"
              id="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
              onChange={handleChange}
            />

            <input
              type="password"
              placeholder="Password"
              id="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
              onChange={handleChange}
            />
            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-yellow-500 hover:text-black transition duration-300"
            >
              {loading ? "Loading..." : "Create Account"}
            </button>
            {message && (
              <p className="text-green-600 text-center mt-3">{message}</p>
            )}

            {error && <p className="text-red-600 text-center mt-3">{error}</p>}
          </form>

          {/* Divider */}
          <div className="flex items-center my-3">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Social Buttons */}
<div className="flex gap-3 justify-center">
  {/* Google */}
  <button className="w-10 h-10 border border-gray-300 py-3 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-red-50 hover:border-red-400 hover:scale-105 group">
    <FaGoogle className="text-xl text-gray-400 group-hover:text-red-500 transition-colors duration-300" />
  </button>

  {/* Apple */}
  <button className="w-10 h-10 border border-gray-300 py-3 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-gray-900 hover:border-gray-900 hover:scale-105 group">
    <FaApple className="text-xl text-gray-400 group-hover:text-white transition-colors duration-300" />
  </button>

  {/* Twitter/X */}
  <button className="w-10 h-10 border border-gray-300 py-3 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-sky-50 hover:border-sky-400 hover:scale-105 group">
    <FaTwitter className="text-xl text-gray-400 group-hover:text-sky-500 transition-colors duration-300" />
  </button>

  {/* LinkedIn */}
  <button className="w-10 h-10 border border-gray-300 py-3 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-blue-50 hover:border-blue-600 hover:scale-105 group">
    <FaLinkedin className="text-xl text-gray-400 group-hover:text-blue-600 transition-colors duration-300" />
  </button>
</div>

          {/* Footer */}
          <p className="text-sm text-gray-500 mt-3 text-center">
            Already have an account?{" "}
            <Link to={"/sign-in"}>
              <span className="text-blue-900 cursor-pointer font-medium">
                Sign in
              </span>
            </Link>
          </p>

          {/* Trust */}
          <p className="text-xs text-gray-400 mt-1 text-center">
            🔒 Secure Registration
          </p>
        </div>

        {/* RIGHT SIDE - IMAGE */}
        <div className="hidden md:block md:w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1724780997589-4c67b98491ee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="property"
            className="h-full w-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      </div>
    </div>
  );
}
