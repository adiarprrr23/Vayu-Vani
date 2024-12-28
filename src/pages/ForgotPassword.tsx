import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { commonStyles } from "../styles/common";
import { EmailForm } from "../components/auth/EmailForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      // toast.success('Check your email for the OTP.');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP");
      toast.error(err instanceof Error ? err.message : "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className={`w-full max-w-md p-8 ${commonStyles.card}`}>
        <h2 className={`text-2xl text-center mb-8 ${commonStyles.heading}`}>
          Forgot Password
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md text-sm">
            {error}
          </div>
        )}

        <EmailForm
          email={email}
          setEmail={setEmail}
          onSubmit={handleSendOTP}
          isLoading={isLoading}
        />

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
          >
            Back to Login
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
