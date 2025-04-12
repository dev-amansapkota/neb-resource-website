import React from 'react';

const ResourceCard = ({ title, description, link, icon, features }) => {
  return (
    <div className="relative p-6 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 bg-[length:400%_400%] animate-gradient-rotate hover:opacity-90">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-600 to-pink-700 bg-[length:400%_400%] animate-gradient-rotate opacity-50 rounded-lg"></div>
      <div className="relative z-10 flex justify-center mb-4">
        <div className="p-4 bg-white rounded-full shadow-lg transform transition-all duration-300 hover:scale-110">
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-semibold mb-2 text-white drop-shadow-lg">{title}</h3>
      <p className="text-lg text-white mb-4 drop-shadow-lg">{description}</p>
      <ul className="mb-4 text-white space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span className="text-white">{feature}</span>
          </li>
        ))}
      </ul>
      <a
        href={link}
        className="inline-block mt-4 text-blue-400 font-semibold hover:text-blue-600 transform transition-all duration-300 hover:scale-110 hover:underline"
        aria-label={`Learn more about ${title}`}
      >
        Learn More
      </a>
    </div>
  );
};

export default ResourceCard;
