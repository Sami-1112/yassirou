// src/components/common/MessageBox.js
import React from 'react';
import { XCircle, CheckCircle } from 'lucide-react';

const MessageBox = ({ type, text, onClose }) => {
  if (!text) return null;

  const bgColor = type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700';
  const icon = type === 'success' ? <CheckCircle className="w-5 h-5 ml-2" /> : <XCircle className="w-5 h-5 ml-2" />;

  return (
    <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 p-4 rounded-lg shadow-lg flex items-center justify-between border ${bgColor} transition-all duration-300 ease-in-out transform`}>
      <div className="flex items-center">
        {icon}
        <span className="text-sm font-medium">{text}</span>
      </div>
      <button onClick={onClose} className="ml-4 text-gray-500 hover:text-gray-700">
        <XCircle className="w-4 h-4" />
      </button>
    </div>
  );
};

export default MessageBox;
