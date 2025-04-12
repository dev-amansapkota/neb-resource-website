"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaLock } from "react-icons/fa";

const AuthForm = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", username: "" });
  const [message, setMessage] = useState(null);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ username: "", email: "", password: "" });
    setMessage(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Processing...");

    const endpoint = isLogin
      ? "http://localhost/NEB%20Resource%20website/neb-resource/Backend/login.php"
      : "http://localhost/NEB%20Resource%20website/neb-resource/Backend/signup.php";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setMessage(data.message);

      if (data.status === "success") {
        localStorage.setItem("user", JSON.stringify(data.user));  // Store user details in localStorage
        router.push("/profile"); // Redirect to profile page after login
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage("Server error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">{isLogin ? "Login" : "Sign Up"}</h2>

        {message && <p className={`text-center mb-3 ${message.includes("error") ? "text-red-500" : "text-green-500"}`}>{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username"
                className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" required />
            </div>
          )}

          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email"
              className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Password"
              className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400">
              {showPassword ? "👁️" : "🔒"}
            </button>
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={toggleForm} className="text-blue-500 ml-1">{isLogin ? "Sign Up" : "Login"}</button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
