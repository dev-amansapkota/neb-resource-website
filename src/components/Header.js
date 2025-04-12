"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaSignInAlt } from "react-icons/fa";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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
  };

  return (
    <header className="bg-gradient-to-r from-primary via-secondary to-accent text-black py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link href="/">
          <h1 className="text-3xl font-bold text-black hover:text-accent transition duration-300 cursor-pointer">
            NEB Resource
          </h1>
        </Link>

        <nav>
          <ul className="flex space-x-8 text-lg">
            <li>
              <Link href="/notes" className="hover:text-accent transition duration-300 transform hover:scale-105">
                Notes
              </Link>
            </li>
            <li>
              <Link href="/videos" className="hover:text-accent transition duration-300 transform hover:scale-105">
                Videos
              </Link>
            </li>
            <li>
              <Link href="/qa" className="hover:text-accent transition duration-300 transform hover:scale-105">
                Q&A
              </Link>
            </li>
          </ul>
        </nav>

     
        <div className="flex items-center space-x-6">
          {isLoggedIn ? (
            <div className="relative group">
              <button
                onClick={() => router.push("/profile")}
                className="flex items-center space-x-2 bg-primary text-black px-4 py-2 rounded-lg hover:bg-primary-dark transition-transform duration-300 ease-in-out"
              >
                <FaUserCircle className="text-2xl" />
                <span className="hidden md:block">{username}</span> 
              </button>

              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <ul className="space-y-2 p-2">
                  <li>
                    <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 hover:bg-gray-100 rounded-lg w-full text-left transition duration-200"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link href="/AuthForm">
              <button className="flex items-center bg-accent text-black py-3 px-6 rounded-lg hover:bg-accent-dark transition duration-300 ease-in-out">
                <FaSignInAlt className="text-xl" />
                <span>Login</span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
