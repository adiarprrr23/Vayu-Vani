import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, User } from 'lucide-react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../hooks/useAuth';
import { commonStyles } from '../styles/common';

export function Header() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignOutClick = async () => {
    await signOut();
    setDropdownOpen(false); // Close the dropdown menu
    document.documentElement.classList.add('dark'); // Ensure dark theme
    navigate('/');
  };

  const handleNavItemClick = (path: string) => {
    navigate(path);
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
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const navItemClass = "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors";
  const dropdownItemClass = "block w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors";

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          
          {user && (
            <>
              <nav className="hidden md:flex items-center space-x-8">
                <button 
                  onClick={() => handleNavItemClick('/')}
                  className={navItemClass}
                >
                  Home
                </button>
                <button 
                  onClick={() => handleNavItemClick('/blogs')}
                  className={navItemClass}
                >
                  Blogs
                </button>
                {user.email === adminEmail && (
                  <button 
                    onClick={() => handleNavItemClick('/dashboard')}
                    className={navItemClass}
                  >
                    Dashboard
                  </button>
                )}
                <div className="flex items-center gap-4">
                  <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <button 
                    onClick={handleSignOutClick}
                    className={navItemClass}
                  >
                    Sign Out
                  </button>
                </div>
                <ThemeToggle onToggle={handleThemeToggle} />
              </nav>

              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="md:hidden text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                aria-label="Toggle menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {dropdownOpen && (
          <div ref={dropdownRef} className="md:hidden absolute right-4 top-16 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-50 transition-colors">
            <div className="py-1">
              {user && (
                <>
                  <button 
                    onClick={() => handleNavItemClick('/')}
                    className={dropdownItemClass}
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => handleNavItemClick('/blogs')}
                    className={dropdownItemClass}
                  >
                    Blogs
                  </button>
                  {user.email === adminEmail && (
                    <button 
                      onClick={() => handleNavItemClick('/dashboard')}
                      className={dropdownItemClass}
                    >
                      Dashboard
                    </button>
                  )}
                  <button 
                    onClick={handleSignOutClick}
                    className={dropdownItemClass}
                  >
                    Sign Out
                  </button>
                  <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                    <ThemeToggle onToggle={handleThemeToggle} />
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}