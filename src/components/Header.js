"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaSignInAlt, FaBars, FaTimes, FaHome, FaBook, FaVideo, FaQuestionCircle } from "react-icons/fa";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isClient) {
      const user = localStorage.getItem("user");
      if (user) {
        setIsLoggedIn(true);
        setUsername(JSON.parse(user).name);
      }
    }
  }, [isClient]);

  useEffect(() => {
    if (shouldRedirect) {
      router.push("/");
      setShouldRedirect(false);
    }
  }, [shouldRedirect, router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setShouldRedirect(true);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white bg-opacity-90 backdrop-blur-sm shadow-md py-2" 
        : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-4"
    }`}>
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        <Link href="/">
          <div className="flex items-center group">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 shadow-md group-hover:shadow-lg transition-all duration-300">
              <FaHome className="text-blue-600 text-xl group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isScrolled ? "text-blue-600" : "text-white"} transition-colors duration-300 group-hover:scale-105 transform origin-left`}>
              NEB Resource
            </h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8 text-lg">
            <li>
              <Link href="/notes" className={`flex items-center space-x-2 ${isScrolled ? "text-gray-700" : "text-white"} hover:text-pink-500 transition duration-300 transform hover:scale-105`}>
                <FaBook className="text-lg" />
                <span>Notes</span>
              </Link>
            </li>
            <li>
              <Link href="/videos" className={`flex items-center space-x-2 ${isScrolled ? "text-gray-700" : "text-white"} hover:text-pink-500 transition duration-300 transform hover:scale-105`}>
                <FaVideo className="text-lg" />
                <span>Videos</span>
              </Link>
            </li>
            <li>
              <Link href="/qa" className={`flex items-center space-x-2 ${isScrolled ? "text-gray-700" : "text-white"} hover:text-pink-500 transition duration-300 transform hover:scale-105`}>
                <FaQuestionCircle className="text-lg" />
                <span>Q&A</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* User Controls */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="relative group hidden md:block">
              <button
                onClick={() => router.push("/profile")}
                className={`flex items-center space-x-2 ${
                  isScrolled 
                    ? "bg-blue-100 text-blue-600 hover:bg-blue-200" 
                    : "bg-white bg-opacity-20 text-white hover:bg-opacity-30"
                } px-4 py-2 rounded-lg transition duration-300 backdrop-blur-sm`}
              >
                <FaUserCircle className="text-2xl" />
                <span>{username}</span>
              </button>

              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-10">
                <ul className="space-y-1 p-2">
                  <li>
                    <Link href="/profile" className="flex items-center space-x-2 px-4 py-2 hover:bg-blue-50 rounded-lg transition duration-200">
                      <FaUserCircle className="text-blue-500" />
                      <span>Profile</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full text-left px-4 py-2 hover:bg-blue-50 rounded-lg transition duration-200 text-red-500"
                    >
                      <FaSignInAlt className="transform rotate-180" />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link href="/AuthForm" className="hidden md:block">
              <button className={`flex items-center space-x-2 ${
                isScrolled 
                  ? "bg-blue-500 hover:bg-blue-600 text-white" 
                  : "bg-white text-blue-600 hover:bg-blue-50"
              } py-2 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg`}>
                <FaSignInAlt className="text-lg" />
                <span>Login</span>
              </button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-2xl p-2 rounded-lg focus:outline-none"
          >
            {mobileMenuOpen ? (
              <FaTimes className={isScrolled ? "text-blue-600" : "text-white"} />
            ) : (
              <FaBars className={isScrolled ? "text-blue-600" : "text-white"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg animate-fadeIn">
          <nav className="px-4 py-2">
            <ul className="space-y-3 py-2">
              <li>
                <Link 
                  href="/notes" 
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaBook className="text-blue-500" />
                  <span className="text-gray-700">Notes</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/videos" 
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaVideo className="text-blue-500" />
                  <span className="text-gray-700">Videos</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/qa" 
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaQuestionCircle className="text-blue-500" />
                  <span className="text-gray-700">Q&A</span>
                </Link>
              </li>
              <div className="border-t border-gray-100 my-2"></div>
              {isLoggedIn ? (
                <>
                  <li>
                    <Link 
                      href="/profile" 
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaUserCircle className="text-blue-500" />
                      <span className="text-gray-700">{username}'s Profile</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full text-left p-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <FaSignInAlt className="text-red-500 transform rotate-180" />
                      <span className="text-red-500">Logout</span>
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link 
                    href="/AuthForm" 
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaSignInAlt className="text-blue-500" />
                    <span className="text-gray-700">Login/Register</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}