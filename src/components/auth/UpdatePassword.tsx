import { useState } from 'react';
import { Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ToastContainer, toast } from 'react-toastify';
import { commonStyles } from '../../styles/common';
import 'react-toastify/dist/ReactToastify.css';

export function UpdatePassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.updateUser({
        password
      });

      if (error) throw error;

      toast.success('Password updated successfully. Please login with your new password.');
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update password');
      toast.error(err instanceof Error ? err.message : 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-h-screen pt-20 pl-2 pr-2 flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="flex-grow flex items-center justify-center">
        <div className={`w-full max-w-md p-8 ${commonStyles.card}`}>
          <h2 className={`text-2xl text-center mb-8 ${commonStyles.heading}`}>
            Update Password
          </h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-1 ${commonStyles.text}`}>
                New Password
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pl-10 ${commonStyles.input}`}
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded-md ${commonStyles.button.primary} disabled:opacity-50`}
            >
              {isLoading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}