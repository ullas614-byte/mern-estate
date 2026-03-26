import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate()
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
      if(!res.ok){
        setError(data.message || "Something went wrong");
        setLoading(false);
        return;
      }else{
        setMessage("User created successfully");
        setLoading(false);
        setTimeout(()=>{
          navigate("/sign-in")
        });
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 mb-3 border rounded"
            id="username"
            onChange={handleChange}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-3 border rounded"
            id="email"
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border rounded"
            id="password"
            onChange={handleChange}
          />

          <motion.button
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-800 text-white p-2 rounded"
          >
            {loading ? "Loading..." : "Sign Up"}
          </motion.button>
          {message && (
  <p className="text-green-600 text-center mt-3">{message}</p>
)}

{error && (
  <p className="text-red-600 text-center mt-3">{error}</p>
)}
        </form>
        <div className="flex gap-2">
          <p>Have an account?</p>
          <Link to={"/sign-in"}>
            <span className="text-blue-700">Sign In</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
