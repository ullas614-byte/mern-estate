import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(signInFailure(data.message));
        return;
      } else {
        setMessage("Logging in...");
        dispatch(signInSuccess(data));
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
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
            <h2 className="text-2xl font-semibold mb-1">Welcome Back</h2>
          </div>

          {/* Form */}
          <form className="space-y-2" onSubmit={handleSubmit}>
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
              {loading ? "Signing in..." : "Sign In"}
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
          <div className="flex gap-4">
            <button className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100">
              Google
            </button>
            <button className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100">
              Apple
            </button>
          </div>

          {/* Footer */}
          <p className="text-sm text-gray-500 mt-3 text-center">
            Dont have an account?{" "}
            <Link to={"/sign-up"}>
              <span className="text-blue-900 cursor-pointer font-medium">
                Sign up
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
            src="https://images.unsplash.com/photo-1759428679273-11d914866394?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
