// import { useState } from 'react';
// import { Mail, Lock, User } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '../lib/supabase';
// import { useAuth } from '../hooks/useAuth';
// import { ToastContainer, toast } from 'react-toastify';
// import { commonStyles } from '../styles/common';
// import 'react-toastify/dist/ReactToastify.css';

// export function Login() {
//   const navigate = useNavigate();
//   const { signInWithEmail } = useAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [error, setError] = useState('');
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [infoMessage, setInfoMessage] = useState('');

//   const handleSignIn = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const { error } = await signInWithEmail(email, password);
//     if (error) {
//       setError(error.message);
//     } else {
//       const { data: { user } } = await supabase.auth.getUser();
//       const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

//       if (user && user.email === adminEmail) {
//         navigate('/'); // Navigate to home with admin privileges
//       } else {
//         navigate('/'); // Navigate to home with user privileges
//       }
//     }
//   };

//   const handleSignUp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setInfoMessage('Wait for some time until you get a mail');

//     // Check if email already exists
//     const { data: existingUser, error: existingUserError } = await supabase
//       .from('users')
//       .select('email')
//       .eq('email', email)
//       .single();

//     if (existingUser) {
//       setError('Email already exists');
//       setInfoMessage('');
//       return;
//     }

//     const { data, error } = await supabase.auth.signUp({ email, password });
//     if (error) {
//       setError(error.message);
//       setInfoMessage('');
//     } else {
//       // Show toast message to confirm email
//       toast.success('A confirmation mail has been sent to your mail, confirm the signup in mail and you will be directed to the site.', {
//         autoClose: false,
//         closeOnClick: false,
//         draggable: false,
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
//       <div className="flex-grow flex items-center justify-center">
//         <div className={`w-full max-w-md p-8 ${commonStyles.card}`}>
//           <h2 className={`text-2xl text-center mb-8 ${commonStyles.heading}`}>
//             {isSignUp ? 'Sign Up' : 'Sign In'}
//           </h2>
          
//           {error && (
//             <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md text-sm">
//               {error}
//             </div>
//           )}

//           <div className="flex justify-center mb-4">
//             <button
//               onClick={() => setIsSignUp(false)}
//               className={`px-4 py-2 ${!isSignUp ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'} rounded-l-md`}
//             >
//               Sign In
//             </button>
//             <button
//               onClick={() => setIsSignUp(true)}
//               className={`px-4 py-2 ${isSignUp ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'} rounded-r-md`}
//             >
//               Sign Up
//             </button>
//           </div>

//           <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-6">
//             {isSignUp && (
//               <div>
//                 <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Name</label>
//                 <div className="mt-1 relative">
//                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300"
//                     required
//                   />
//                 </div>
//               </div>
//             )}
//             <div>
//               <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label>
//               <div className="mt-1 relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300"
//                   required
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Password</label>
//               <div className="mt-1 relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300"
//                   required
//                 />
//               </div>
//             </div>
//             <button
//               type="submit"
//               className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               {isSignUp ? 'Sign Up' : 'Sign In'}
//             </button>
//             {isSignUp && infoMessage && (
//               <div className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
//                 {infoMessage}
//               </div>
//             )}
//           </form>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }
import { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import { commonStyles } from '../styles/common';
import 'react-toastify/dist/ReactToastify.css';

export function Login() {
  const navigate = useNavigate();
  const { signInWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await signInWithEmail(email, password);
    if (error) {
      setError(error.message);
    } else {
      const { data: { user } } = await supabase.auth.getUser();
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

      if (user && user.email === adminEmail) {
        navigate('/'); // Navigate to home with admin privileges
      } else {
        navigate('/'); // Navigate to home with user privileges
      }
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setInfoMessage('Wait for some time until you get a mail');

    // Check if email already exists
    const { data: existingUser, error: existingUserError } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      setError('Email already exists');
      setInfoMessage('');
      return;
    }

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
      setInfoMessage('');
    } else {
      // Show toast message to confirm email
      toast.success('A confirmation mail has been sent to your mail, confirm the signup in mail and you will be directed to the site.', {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      });
    }
  };

  return (
    <div className="max-h-screen pt-20 pl-2 pr-2 flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="flex-grow flex items-center justify-center">
        <div className={`w-full max-w-md p-8 ${commonStyles.card}`}>
          <h2 className={`text-2xl text-center mb-8 ${commonStyles.heading}`}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-center mb-4">
            <button
              onClick={() => setIsSignUp(false)}
              className={`px-4 py-2 ${!isSignUp ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'} rounded-l-md`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`px-4 py-2 ${isSignUp ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'} rounded-r-md`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-6">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Name</label>
                <div className="mt-1 relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300"
                    required
                  />
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Password</label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
            {isSignUp && infoMessage && (
              <div className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
                {infoMessage}
              </div>
            )}
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}