"use client";

import { useState, useEffect } from "react";
import { RiLiveLine } from "react-icons/ri";
import { FaFileAlt, FaVideo, FaQuestionCircle, FaAtom, FaDownload, FaGraduationCap, FaChalkboardTeacher, FaAward ,FaChalkboard, FaClipboardList, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import ResourceCard from "@/components/ResourceCard";
import Imageslider from "@/components/Imageslider";

import 'swiper/css';

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      setIsDarkMode(false);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, [isDarkMode]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 h-16 w-16"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-800 transition-all duration-300"
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? "🌞" : "🌙"}
      </button>

      <Imageslider />
      <section className="py-16 text-black text-center animate__animated animate__fadeIn animate__delay-1s">
  <h2 className="text-3xl md:text-4xl font-semibold mb-6 animate__animated animate__fadeIn animate__delay-1s">
    Unlock Your Future with <span className="text-yellow-300 animate__animated animate__fadeIn animate__delay-2s">Aman Education</span> – 
    The <span className="text-purple-500 animate__animated animate__fadeIn animate__delay-3s">Most Trusted</span> & 
    <span className="text-teal-600 animate__animated animate__fadeIn animate__delay-4s">Affordable</span> Learning Platform
  </h2>
  <p className="text-lg md:text-xl mb-6 animate__animated animate__fadeIn animate__delay-5s">
    Discover limitless possibilities and unlock your true potential by joining <span className="font-semibold text-purple-500">Aman Education</span> – 
    where excellence meets affordability.
  </p>
  <a
    href="#resources"
    className="bg-white text-teal-600 font-semibold py-3 px-8 rounded-lg shadow-xl hover:bg-teal-500 hover:text-white transition-all duration-500 animate__animated animate__bounceIn animate__delay-6s"
  >
    Get Started Today
  </a>

</section>
      <section className="py-24 text-black text-center w-full bg-gray-50">
  <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-gray-900">Our Key Features</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 px-4 lg:px-12">
    <div className="flex flex-col items-center transform transition duration-300 hover:scale-105 hover:translate-y-4">
      < RiLiveLine size={50} className="text-red-500 mb-6 transition duration-500 transform hover:scale-125" />
      <h3 className="text-xl font-semibold mb-2 text-gray-800">Daily Live</h3>
      <p className="text-sm text-gray-600">Stay updated with live sessions every day!</p>
    </div>
    <div className="flex flex-col items-center transform transition duration-300 hover:scale-105 hover:translate-y-4">
      <FaChalkboard size={50} className="text-purple-500 mb-6 transition duration-500 transform hover:scale-125" />
      <h3 className="text-xl font-semibold mb-2 text-gray-800">Interactive Classes</h3>
      <p className="text-sm text-gray-600">Engage with expert instructors in real-time.</p>
    </div>
    <div className="flex flex-col items-center transform transition duration-300 hover:scale-105 hover:translate-y-4">
      <FaClipboardList size={50} className="text-orange-500 mb-6 transition duration-500 transform hover:scale-125" />
      <h3 className="text-xl font-semibold mb-2 text-gray-800">10 Million +</h3>
      <p className="text-sm text-gray-600">Access tests, sample papers, and notes.</p>
    </div>
    <div className="flex flex-col items-center transform transition duration-300 hover:scale-105 hover:translate-y-4">
      <FaClock size={50} className="text-green-500 mb-6 transition duration-500 transform hover:scale-125" />
      <h3 className="text-xl font-semibold mb-2 text-gray-800">24 x 7</h3>
      <p className="text-sm text-gray-600">Get doubt-solving assistance round the clock.</p>
    </div>
    <div className="flex flex-col items-center transform transition duration-300 hover:scale-105 hover:translate-y-4">
      <FaMapMarkerAlt size={50} className="text-red-500 mb-6 transition duration-500 transform hover:scale-125" />
      <h3 className="text-xl font-semibold mb-2 text-gray-800"> Offline Centres</h3>
      <p className="text-sm text-gray-600">Access offline support .</p>
    </div>
  </div>
</section>

      <section id="resources" className="py-24 bg-gray-100 animate__animated animate__fadeIn animate__delay-4s border-4 border-transparent border-t-8 animate-gradient-border bg-light w-full">
        <div className="container mx-auto text-center w-full my-2">
          <h2 className="text-3xl md:text-4xl font-semibold text-purple-800 mb-8">Our Resources</h2>
          <p className="text-lg md:text-xl mb-12 text-black  my-100">
            Explore a wide range of educational resources designed to elevate your learning experience and provide real value.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <ResourceCard
              title="Notes"
              description="Access high-quality study notes for all your subjects."
              link="/notes"
              icon={<FaFileAlt size={50} className="text-blue-500 transform transition duration-300 hover:scale-110 hover:translate-y-2" />}
              features={[
                "Comprehensive Notes",
                "Subject-wise Categorization",
                "Downloadable PDFs",
                <FaDownload key="download" className="inline-block ml-2 text-gray-500" />,
              ]}
            />
            
            <ResourceCard
              title="Video Lectures"
              description="Learn with our expert video lectures."
              link="/videos"
              icon={<FaVideo size={50} className="text-purple-500 transform transition duration-300 hover:scale-110 hover:translate-y-2" />}
              features={[
                "Expert Instructors",
                "High-Quality Videos",
                "Interactive Quizzes",
                <FaGraduationCap key="grad" className="inline-block ml-2 text-gray-500" />,
              ]}
            />
            <ResourceCard
              title="Q&A"
              description="Get answers to your most challenging questions."
              link="/qa"
              icon={<FaQuestionCircle size={50} className="text-green-500 transform transition duration-300 hover:scale-110 hover:translate-y-2" />}
              features={[
                "24/7 Assistance",
                "Subject Experts",
                "Interactive Discussions",
                <FaChalkboardTeacher key="teacher" className="inline-block ml-2 text-gray-500" />,
              ]}
            />
            <ResourceCard
              title="Physics - Motion"
              description="Detailed notes on motion in physics."
              link="#"
              icon={<FaAtom size={50} className="text-red-500 transform transition duration-300 hover:scale-110 hover:translate-y-2" />}
              features={[
                "In-depth Concepts",
                "Practical Examples",
                "Interactive Diagrams",
                <FaAward key="award" className="inline-block ml-2 text-gray-500" />,
              ]}
            />
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-100 text-black text-center w-full">
  <h2 className="text-3xl md:text-4xl font-semibold mb-8">Join 15 Million Students on Aman Education!</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-xl transform transition-all duration-500 hover:scale-105">
      <img 
        src="https://metricool.com/wp-content/uploads/istockphoto-1396933001-612x612-1.jpg" 
        alt="blue tick" 
        className="w-10 h-10 object-contain mb-4" 
      />
      <h3 className="text-xl font-semibold mb-2">Live & Recorded Classes</h3>
      <p>Access live and recorded sessions anytime, anywhere.</p>
    </div>
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-xl transform transition-all duration-500 hover:scale-105">
      <img 
        src="https://metricool.com/wp-content/uploads/istockphoto-1396933001-612x612-1.jpg" 
        alt="blue tick" 
        className="w-10 h-10 object-contain mb-4" 
      />
      <h3 className="text-xl font-semibold mb-2">Dashboard for Progress Tracking</h3>
      <p>Track your learning journey and monitor your progress.</p>
    </div>
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-xl transform transition-all duration-500 hover:scale-105">
      <img 
        src="https://metricool.com/wp-content/uploads/istockphoto-1396933001-612x612-1.jpg" 
        alt="blue tick" 
        className="w-10 h-10 object-contain mb-4" 
      />
      <h3 className="text-xl font-semibold mb-2">Millions of Practice Questions</h3>
      <p>Thousands of questions available for practice at your fingertips.</p>
    </div>
  </div>
  <div className="flex flex-col items-center justify-center w-full h-auto mt-12 gap-12">

  <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500 drop-shadow-lg">
    NEB Resource App
  </h2>


  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-6xl">

    <div className="relative group bg-white/40 backdrop-blur-lg rounded-2xl shadow-xl p-6 flex flex-col items-center transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
      <img 
        src="https://play-lh.googleusercontent.com/GXfuFi1L2yOa7mOHWcQ9uWHdwRN7kGxK8wBOZ2TrO_O-e0ir1YxaALtfz3hv3mPOzw=w480-h960-rw" 
        alt="App Download" 
        className="w-48 h-auto object-contain rounded-xl transition-all duration-300 group-hover:rotate-2 group-hover:scale-105"
      />
     <p className="mt-4 text-gray-900 font-semibold text-lg">Download the App</p>
<a href="https://play.google.com/store/apps/details?id=com.app.NEBResource&hl=en" target="_blank" rel="noopener noreferrer">
  <button className="mt-3 bg-gradient-to-r from-purple-500 to-teal-500 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110">
    Download Now
  </button>
</a>

</div>
    <div className="relative group bg-white/40 backdrop-blur-lg rounded-2xl shadow-xl p-6 flex flex-col items-center transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
      <img 
        src="https://i.imgur.com/Qa0mVUH.png" 
        alt="App Features" 
        className="w-48 h-auto object-contain rounded-xl transition-all duration-300 group-hover:rotate-2 group-hover:scale-105"
      />
      <p className="mt-4 text-gray-900 font-semibold text-lg">Explore Features</p>
      <button className="mt-3 bg-gradient-to-r from-purple-500 to-teal-500 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110">
        Learn More
      </button>
    </div>

    <div className="relative group bg-white/40 backdrop-blur-lg rounded-2xl shadow-xl p-6 flex flex-col items-center transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
      <img 
        src="https://play-lh.googleusercontent.com/GXfuFi1L2yOa7mOHWcQ9uWHdwRN7kGxK8wBOZ2TrO_O-e0ir1YxaALtfz3hv3mPOzw=w480-h960-rw" 
        alt="Get Started" 
        className="w-48 h-auto object-contain rounded-xl transition-all duration-300 group-hover:rotate-2 group-hover:scale-105"
      />
      <p className="mt-4 text-gray-900 font-semibold text-lg">Get Started Now</p>
      <button className="mt-3 bg-gradient-to-r from-purple-500 to-teal-500 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110">
        Start Now
      </button>
    </div>
  </div>
</div>


</section>
      <section className="py-24 bg-purple-600 text-white border-4 border-transparent border-t-8 animate-gradient-border bg-light w-full">
        <div className="container mx-auto text-center w-full">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8">What Our Users Say</h2>
          <div className="flex overflow-hidden animate__animated animate__fadeIn animate__delay-5s">
            <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate__animated animate__slideInLeft">
              <p className="text-lg italic text-gray-800 mb-4">
                &quot;This platform revolutionized my study routine! The resources are top-tier and helped me grasp concepts quickly.&quot;
              </p>
              <p className="font-semibold text-gray-600">- John Doe, Student</p>
            </div>
            <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ml-4 animate__animated animate__slideInRight">
              <p className="text-lg italic text-gray-800 mb-4">
                &quot;I love the variety of resources available. From video lectures to downloadable notes, everything I need is right here!&quot;
              </p>
              <p className="font-semibold text-gray-600">- Jane Smith, Learner</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-pink-500 to-orange-500 text-white text-center bg-light w-full">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">Join Us Today!</h2>
        <p className="text-lg md:text-xl mb-8">
          Start your learning journey today with access to premium resources and expert help.
        </p>
        <a
          href="#resources"
          className="bg-white text-orange-600 font-semibold py-3 px-8 rounded-lg shadow-xl hover:bg-orange-400 hover:text-white transition-all duration-500"
        >
          Sign Up Now
        </a>
      </section>
    </div>
  );
}
