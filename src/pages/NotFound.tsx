import React from 'react';
import { useNavigate } from 'react-router-dom';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">404: Not Found</h1>
      <p className="mt-4 text-gray-700 dark:text-gray-300">The page you are looking for does not exist.</p>
      <button
        onClick={() => navigate('/')}
        className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Go to Home
      </button>
    </div>
  );
}