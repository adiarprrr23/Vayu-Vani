import { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { commonStyles } from '../styles/common';

export function NewsletterSubscribe() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const { data: existingSubscriber, error: checkError } = await supabase
        .from('newsletter_subscribers')
        .select('email')
        .eq('email', email)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      if (existingSubscriber) {
        setMessage({
          type: 'error',
          text: 'This email is already subscribed.',
        });
      } else {
        const { error } = await supabase
          .from('newsletter_subscribers')
          .insert({ name, email });

        if (error) throw error;

        setMessage({
          type: 'success',
          text: "Thanks for subscribing! You'll receive updates about new blog posts.",
        });
        setName('');
        setEmail('');
        setTimeout(() => setIsOpen(false), 3000);
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to subscribe. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        title="Subscribe to updates"
      >
        <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-64 sm:w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50"
        >
          <div className="p-4">
            <h3 className={`font-semibold mb-4 ${commonStyles.heading}`}>
              Get Blog Updates
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className={commonStyles.input}
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className={commonStyles.input}
                  required
                />
              </div>
              {message && (
                <div className={`p-2 rounded text-sm ${
                  message.type === 'success' 
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200' 
                    : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200'
                }`}>
                  {message.text}
                </div>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 rounded-md ${commonStyles.button.primary} disabled:opacity-50`}
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}