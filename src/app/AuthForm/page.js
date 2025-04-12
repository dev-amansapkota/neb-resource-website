"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash, FaGoogle, FaFacebook } from "react-icons/fa";

const AuthForm = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", username: "" });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [animation, setAnimation] = useState(false);

  // Animation effect when switching forms
  useEffect(() => {
    setAnimation(true);
    const timer = setTimeout(() => setAnimation(false), 500);
    return () => clearTimeout(timer);
  }, [isLogin]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ username: "", email: "", password: "" });
    setMessage(null);
    setFormErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    if (!isLogin && !formData.username) {
      errors.username = "Username is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setMessage(null);

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
      
      if (data.status === "success") {
        setMessage({ type: "success", text: data.message });
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Add a slight delay for better UX
        setTimeout(() => {
          router.push("/profile");
        }, 1000);
      } else {
        setMessage({ type: "error", text: data.message || "Authentication failed" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Server error. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  // Function to handle social login (placeholder)
  const handleSocialLogin = (provider) => {
    setMessage({ type: "info", text: `${provider} login not implemented yet` });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <div className={`w-full max-w-md overflow-hidden transition-all duration-500 ${animation ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
        {/* Card with tabs */}
        <div className="bg-white shadow-xl rounded-xl">
          {/* Tabs */}
          <div className="flex">
            <button 
              onClick={() => !isLogin && toggleForm()} 
              className={`flex-1 py-4 text-center font-medium transition-colors duration-300 ${isLogin ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              Login
            </button>
            <button 
              onClick={() => isLogin && toggleForm()} 
              className={`flex-1 py-4 text-center font-medium transition-colors duration-300 ${!isLogin ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              Sign Up
            </button>
          </div>
          
          {/* Form content */}
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            
            <p className="text-center text-gray-600 text-sm">
              {isLogin ? "Sign in to access your account" : "Fill in your details to get started"}
            </p>
            
            {message && (
              <div className={`p-3 rounded-lg text-sm ${
                message.type === "success" ? "bg-green-100 text-green-700" : 
                message.type === "error" ? "bg-red-100 text-red-700" : 
                "bg-blue-100 text-blue-700"
              }`}>
                {message.text}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-1">
                  <div className="relative">
                    <FaUser className="absolute left-3 top-3 text-gray-400" />
                    <input 
                      type="text" 
                      name="username" 
                      value={formData.username} 
                      onChange={handleChange} 
                      placeholder="Username"
                      className={`w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                        formErrors.username ? "border-red-300 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"
                      }`} 
                    />
                  </div>
                  {formErrors.username && (
                    <p className="text-red-500 text-xs ml-2">{formErrors.username}</p>
                  )}
                </div>
              )}
              
              <div className="space-y-1">
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Email"
                    className={`w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                      formErrors.email ? "border-red-300 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"
                    }`} 
                  />
                </div>
                {formErrors.email && (
                  <p className="text-red-500 text-xs ml-2">{formErrors.email}</p>
                )}
              </div>
              
              <div className="space-y-1">
                <div className="relative">
                  <FaLock className="absolute left-3 top-3 text-gray-400" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    placeholder="Password"
                    className={`w-full pl-10 pr-10 p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                      formErrors.password ? "border-red-300 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"
                    }`} 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {formErrors.password && (
                  <p className="text-red-500 text-xs ml-2">{formErrors.password}</p>
                )}
              </div>
              
              {isLogin && (
                <div className="flex justify-end">
                  <button type="button" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                    Forgot password?
                  </button>
                </div>
              )}
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <span>{isLogin ? "Login" : "Sign Up"}</span>
                )}
              </button>
            </form>
            
            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500 text-sm">or continue with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            
            {/* Social login options */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleSocialLogin('Google')}
                className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FaGoogle className="text-red-500" />
                <span>Google</span>
              </button>
              <button 
                onClick={() => handleSocialLogin('Facebook')}
                className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FaFacebook className="text-blue-600" />
                <span>Facebook</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <p className="text-center mt-6 text-gray-600 text-sm">
          By continuing, you agree to our 
          <button className="text-blue-600 hover:underline mx-1">Terms of Service</button>
          and
          <button className="text-blue-600 hover:underline mx-1">Privacy Policy</button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;