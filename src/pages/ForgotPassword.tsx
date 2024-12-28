import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { commonStyles } from "../styles/common";
import { EmailForm } from "../components/auth/EmailForm";
import { OTPForm } from "../components/auth/OTPForm";
// import { PasswordForm } from '../components/auth/UpdatePassword';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState<"email" | "otp" | "verified" | "password">(
    "email"
  );
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
      console.log(`${window.location.origin}/reset-password`);

      // const { data, error } = await supabase.auth.signInWithOtp({
      //     email,
      //     options: {
      //       emailRedirectTo: 'http://localhost:5173/reset-password'
      //     }
      //   })

      if (error) throw error;

      //   setStep('otp');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "recovery",
      });

      if (error) throw error;
      setStep("verified");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      navigate("/login", {
        state: {
          message:
            "Password updated successfully. Please login with your new password.",
        },
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className={`w-full max-w-md p-8 ${commonStyles.card}`}>
        <h2 className={`text-2xl text-center mb-8 ${commonStyles.heading}`}>
          {step === "email" && "Forgot Password"}
          {step === "otp" && "Enter OTP"}
          {step === "verified" && "OTP Verified"}
          {step === "password" && "Set New Password"}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md text-sm">
            {error}
          </div>
        )}

        {step === "email" && (
          <EmailForm
            email={email}
            setEmail={setEmail}
            onSubmit={handleSendOTP}
            isLoading={isLoading}
          />
        )}

        {/* {step === 'otp' && (
          <OTPForm
            otp={otp}
            setOtp={setOtp}
            onSubmit={handleVerifyOTP}
            isLoading={isLoading}
          />
        )}

        {step === 'verified' && (
          <div className="text-center">
            <p className={`mb-6 ${commonStyles.text}`}>
              OTP verified successfully! Would you like to change your password?
            </p>
            <div className="space-y-4">
              <button
                onClick={() => setStep('password')}
                className={`w-full py-2 px-4 rounded-md ${commonStyles.button.primary}`}
              >
                Change Password
              </button>
              <button
                onClick={() => navigate('/login')}
                className={`w-full py-2 px-4 rounded-md ${commonStyles.button.secondary}`}
              >
                Back to Login
              </button>
            </div>
          </div>
        )}

        {step === 'password' && (
          <PasswordForm
            password={newPassword}
            setPassword={setNewPassword}
            onSubmit={handleUpdatePassword}
            isLoading={isLoading}
          />
        )}

        {step !== 'verified' && (
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate('/login')}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
            >
              Back to Login
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
}
