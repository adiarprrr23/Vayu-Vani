import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
// import { useAuth } from '../hooks/useAuth';
import { NewsletterSubscribe } from './NewsletterSubscribe';

export function Header() {
  const navigate = useNavigate();
  // const { user, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  // const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);



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
              onClick={() => handleNavItemClick('/blogs')}
              className={`${navItemClass} ${window.location.pathname === '/blogs' ? activeNavItemClass : ''} px-3 py-2 rounded-md text-sm font-medium`}
            >
              Blogs
            </button>
            <NewsletterSubscribe />
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
                onClick={() => handleNavItemClick('/blogs')}
                className={`${dropdownItemClass} ${window.location.pathname === '/blogs' ? activeNavItemClass : ''}`}
              >
                Blogs
              </button>
              <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                <NewsletterSubscribe />
              </div>
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