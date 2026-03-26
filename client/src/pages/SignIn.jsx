import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice.js";
export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state)=>state.user);
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
      if(!res.ok){
        dispatch(signInFailure(data.message));
        return;
      }else{
        setMessage("Logging in...");
        dispatch(signInSuccess(data));
        setTimeout(()=>{
          navigate("/")
        }, 2000)
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
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
        <h2 className="text-2xl font-bold mb-4 text-center">Signin</h2>
        <form onSubmit={handleSubmit}>
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
            {loading ? "Loading..." : "Sign In"}
          </motion.button>
          {message && (
  <p className="text-green-600 text-center mt-3">{message}</p>
)}

{error && (
  <p className="text-red-600 text-center mt-3">{error}</p>
)}
        </form>
        <div className="flex gap-2">
          <p>Dont have an account?</p>
          <Link to={"/sign-up"}>
            <span className="text-blue-700">Sign up</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
