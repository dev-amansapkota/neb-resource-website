import React from "react";

export const Button = ({ className, children, ...props }) =>{
  return (
    <button
      className={`rounded-lg shadow-md hover:shadow-lg transition-all ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};


