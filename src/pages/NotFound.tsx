import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function NotFound() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const checkDatabaseConnection = async () => {
      try {
        const { error } = await supabase.from('some_table').select('*').limit(1);
        if (error) {
          throw error;
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    };

    checkDatabaseConnection();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">404: Not Found</h1>
        <p className="mt-4 text-gray-700 dark:text-gray-300">The page you are looking for does not exist or there was an issue connecting to the database.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return null;
}