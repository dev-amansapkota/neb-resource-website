"use client";

import React, { useState } from 'react';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';

const ResourceCard = ({ title, description, link, icon, features, difficulty = "medium", category }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Determine difficulty color
  const difficultyColors = {
    easy: "bg-green-500",
    medium: "bg-yellow-500",
    hard: "bg-red-500"
  };
  
  const difficultyColor = difficultyColors[difficulty] || difficultyColors.medium;
  
  return (
    <div 
      className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient wrapper */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-500 to-pink-500 opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Animated particle effects (only visible on hover) */}
      <div className="absolute inset-0 overflow-hidden">
        {isHovered && Array(10).fill().map((_, i) => (
          <div 
            key={i}
            className="absolute w-3 h-3 rounded-full bg-white opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      {/* Card content */}
      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Category badge */}
        {category && (
          <div className="absolute top-2 right-2 px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
            {category}
          </div>
        )}
        
        {/* Difficulty indicator */}
        <div className="absolute top-2 left-2 flex items-center space-x-1">
          <span className={`inline-block w-2 h-2 rounded-full ${difficultyColor}`}></span>
          <span className="text-xs text-white capitalize">{difficulty}</span>
        </div>
        
        {/* Icon */}
        <div className="flex justify-center mb-5 mt-6">
          <div className="p-4 bg-white rounded-full shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
            {icon}
          </div>
        </div>
        
        {/* Title and description */}
        <h3 className="text-2xl font-bold mb-3 text-white drop-shadow-lg text-center">{title}</h3>
        <p className="text-white text-opacity-90 mb-4 text-center">{description}</p>
        
        {/* Features */}
        <div className="flex-grow">
          <ul className="mb-4 text-white space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start space-x-2">
                <FaCheckCircle className="text-white text-opacity-80 mt-1 flex-shrink-0" />
                <span className="text-white text-opacity-90">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Action button */}
        <div className="mt-auto pt-4">
          <a
            href={link}
            className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 rounded-lg bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 text-white font-medium transition-all duration-300 group-hover:shadow-md"
            aria-label={`Learn more about ${title}`}
          >
            <span>Learn More</span>
            <FaArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
      
      {/* Shine effect */}
      <div 
        className={`absolute top-0 -inset-full h-full w-1/2 z-5 block transform ${isHovered ? "animate-shine" : ""} bg-gradient-to-r from-transparent via-white opacity-20 to-transparent`}
      />
    </div>
  );
};

export default ResourceCard;