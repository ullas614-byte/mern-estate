import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
        <div className="w-full md:w-1/2 p-6 lg:p-10 flex flex-col justify-center bg-white overflow-y-auto">
          {/* Logo */}
          <div className="mb-4">
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-blue-900 uppercase">
              D Prime Assets
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="h-px w-6 bg-yellow-500"></span>
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">
                Real Estate Management
              </p>
            </div>
          </div>

          {/* Title */}
          <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">Create Your Account</h2>
          <p className="text-gray-500 mb-6">
            Start managing your properties today
          </p>
          </div>

          {/* Form */}
          <form className="space-y-3" onSubmit={handleSubmit}>
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
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-4">
            <button className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100">
              Google
            </button>
            <button className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100">
              Apple
            </button>
          </div>

          {/* Footer */}
          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?{" "}
            <Link to={"/sign-in"}>
              <span className="text-blue-900 cursor-pointer font-medium">
                Sign in
              </span>
            </Link>
          </p>

          {/* Trust */}
          <p className="text-xs text-gray-400 mt-2 text-center">
            🔒 Secure Registration
          </p>
        </div>

        {/* RIGHT SIDE - IMAGE */}
        <div className="hidden md:block md:w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
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
