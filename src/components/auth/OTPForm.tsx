import { Key } from 'lucide-react';
import { commonStyles } from '../../styles/common';

interface OTPFormProps {
  otp: string;
  setOtp: (otp: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
}

export function OTPForm({ otp, setOtp, onSubmit, isLoading }: OTPFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className={`block text-sm font-medium mb-1 ${commonStyles.text}`}>
          Enter OTP
        </label>
        <div className="relative">
          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className={`pl-10 ${commonStyles.input}`}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 px-4 rounded-md ${commonStyles.button.primary} disabled:opacity-50`}
      >
        {isLoading ? 'Verifying...' : 'Verify OTP'}
      </button>
    </form>
  );
}