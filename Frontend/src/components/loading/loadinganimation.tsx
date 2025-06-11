import React from 'react';

interface LoadingOverlayProps {
  message?: string;
}

const LoadingOverlay = ({ message = 'Analyzing... Please wait' }: LoadingOverlayProps) => {
  return (
    <div className="h-full w-full bg-black bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center rounded-xl">
      <div className="border-2 border-gray-200 bg-white p-6 rounded-xl flex flex-col items-center shadow-lg">
        <svg
          className="animate-spin h-8 w-8 text-teal-600 mb-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
        <p className="text-lg font-medium text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
