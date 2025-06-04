// src/components/MessageDisplay.js
import React from 'react';

const MessageDisplay = ({ message, type }) => {
  if (!message) return null;

  const bgColor = type === 'success' ? 'bg-green-100' : 'bg-red-100';
  const textColor = type === 'success' ? 'text-green-700' : 'text-red-700';
  const borderColor = type === 'success' ? 'border-green-400' : 'border-red-400';

  return (
    <div className={`p-3 rounded-lg border ${borderColor} ${bgColor} ${textColor} text-center mt-4`}>
      {message}
    </div>
  );
};

export default MessageDisplay;
