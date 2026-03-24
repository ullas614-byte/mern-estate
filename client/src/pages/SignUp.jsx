import React from 'react'
import { motion } from "framer-motion";
import { Link } from "react-router-dom"

export default function Signup() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Signup
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-3 border rounded"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-800 text-white p-2 rounded"
        >
          Sign Up
        </motion.button>
        <div className='flex gap-2'>
          <p>Have an account?</p>
          <Link to={"/sign-in"}>
          <span className='text-blue-700'>Sign In</span>
          </Link>
        </div>
      </motion.div>

    </div>
  );

}
