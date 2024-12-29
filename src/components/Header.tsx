import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { NewsletterSubscribe } from './NewsletterSubscribe';

export function Header() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
  const activeNavItemClass = "bg-gray-200 dark:bg-gray-700";

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button onClick={() => handleNavItemClick('/')}>
            <Logo />
          </button>
          
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

          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle onToggle={handleThemeToggle} />
            <NewsletterSubscribe />
          </div>

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
            </div>
          </div>
        )}
      </div>
    </header>
  );
}