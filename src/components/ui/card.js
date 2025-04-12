

import React from 'react';

export const Card = ({ children, className }) => (
  <div className={`rounded-lg shadow-md p-4 bg-white ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children }) => (
  <div className="mt-2 text-gray-700">{children}</div>
);

export const CardHeader = ({ children }) => (
  <div className="font-bold text-xl mb-2">{children}</div>
);

export const CardTitle = ({ children, className }) => (
  <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>
);
