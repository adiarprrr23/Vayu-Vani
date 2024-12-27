import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, User } from 'lucide-react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../hooks/useAuth';

export function Header() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const handleSignOutClick = async () => {
    await signOut();
    setProfileDropdownOpen(false); // Close the profile dropdown menu
    navigate('/');
  };

  const handleNavItemClick = (path: string) => {
    navigate(path);
    setDropdownOpen(false); // Close the dropdown when a nav item is clicked
  };

  const handleProtectedNavItemClick = (path: string) => {
    if (user) {
      navigate(path);
    } else {
      navigate('/login');
    }
    setDropdownOpen(false); // Close the dropdown when a nav item is clicked
  };

  const handleThemeToggle = () => {
    document.documentElement.classList.toggle('dark');
    setDropdownOpen(false); // Close the dropdown when the theme is toggled
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
    if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
      setProfileDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen || profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen, profileDropdownOpen]);

  const navItemClass = "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors";
  const dropdownItemClass = "block w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors";
  const activeNavItemClass = "bg-gray-200 dark:bg-gray-700";

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavItemClick('/')}
              className={`${navItemClass} ${window.location.pathname === '/' ? activeNavItemClass : ''} px-3 py-2 rounded-md text-sm font-medium`}
            >
              Home
            </button>
            <button 
              onClick={() => handleProtectedNavItemClick('/blogs')}
              className={`${navItemClass} ${window.location.pathname === '/blogs' ? activeNavItemClass : ''} px-3 py-2 rounded-md text-sm font-medium`}
            >
              Blogs
            </button>
            {user && user.email === adminEmail && (
              <button 
                onClick={() => handleNavItemClick('/dashboard')}
                className={`${navItemClass} ${window.location.pathname === '/dashboard' ? activeNavItemClass : ''} px-3 py-2 rounded-md text-sm font-medium`}
              >
                Dashboard
              </button>
            )}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  Profile
                </button>
                {profileDropdownOpen && (
                  <div ref={profileDropdownRef} className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-50 transition-all duration-300 ease-in-out transform origin-top-right scale-95">
                    <div className="py-2">
                      <div className="px-4 py-2 text-gray-700 dark:text-gray-300">
                        <div className="font-medium">{user.user_metadata?.name}</div>
                        <div className="text-sm">{user.email}</div>
                      </div>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                      <button
                        onClick={handleSignOutClick}
                        className="block w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => handleNavItemClick('/login')}
                className={`${navItemClass} ${window.location.pathname === '/login' ? activeNavItemClass : ''} px-3 py-2 rounded-md text-sm font-medium`}
              >
                Sign In / Sign Up
              </button>
            )}
            <ThemeToggle onToggle={handleThemeToggle} />
          </nav>

          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="md:hidden text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {dropdownOpen && (
          <div ref={dropdownRef} className="md:hidden absolute right-4 top-16 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-50 transition-all duration-300 ease-in-out transform origin-top-right scale-95">
            <div className="py-1">
              <button 
                onClick={() => handleNavItemClick('/')}
                className={`${dropdownItemClass} ${window.location.pathname === '/' ? activeNavItemClass : ''}`}
              >
                Home
              </button>
              <button 
                onClick={() => handleProtectedNavItemClick('/blogs')}
                className={`${dropdownItemClass} ${window.location.pathname === '/blogs' ? activeNavItemClass : ''}`}
              >
                Blogs
              </button>
              {user && user.email === adminEmail && (
                <button 
                  onClick={() => handleNavItemClick('/dashboard')}
                  className={`${dropdownItemClass} ${window.location.pathname === '/dashboard' ? activeNavItemClass : ''}`}
                >
                  Dashboard
                </button>
              )}
              {user ? (
                <>
                  <button 
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className={`${dropdownItemClass} ${window.location.pathname === '/profile' ? activeNavItemClass : ''}`}
                  >
                    Profile
                  </button>
                  {profileDropdownOpen && (
                    <div ref={profileDropdownRef} className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-50 transition-all duration-300 ease-in-out transform origin-top-right scale-95">
                      <div className="py-2">
                        <div className="px-4 py-2 text-gray-700 dark:text-gray-300">
                          <div className="font-medium">{user.user_metadata?.name}</div>
                          <div className="text-sm">{user.email}</div>
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                        <button
                          onClick={handleSignOutClick}
                          className="block w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <button 
                  onClick={() => handleNavItemClick('/login')}
                  className={`${dropdownItemClass} ${window.location.pathname === '/login' ? activeNavItemClass : ''}`}
                >
                  Sign In / Sign Up
                </button>
              )}
              <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                <ThemeToggle onToggle={handleThemeToggle} />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}