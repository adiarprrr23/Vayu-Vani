import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { commonStyles } from '../styles/common';

interface Blog {
  id: string;
  title: string;
  content: string;
  thumbnail_url: string;
  video_url: string;
  author_id: string;
  created_at: string;
  excerpt: string; // Assuming you have an excerpt field
}

export function Blogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase.from('posts').select('*');
      if (error) {
        console.error('Error fetching blogs:', error);
      } else {
        console.log('Fetched blogs:', data); // Log the fetched blogs
        setBlogs(data as Blog[]);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-grow bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className={commonStyles.container}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className={`text-3xl font-bold text-indigo-600 dark:text-indigo-400 ${commonStyles.heading}`}>Bhakti and Beyond</h1>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300 ${commonStyles.input}`}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg shadow-indigo-500/50 overflow-hidden transition-transform transform hover:scale-105">
              <img
                src={blog.thumbnail_url || 'https://via.placeholder.com/150'}
                alt={blog.title}
                className="h-48 w-full object-cover object-top"
                onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')}
              />
              <div className="p-6">
                <h2 className={`text-xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400 ${commonStyles.heading}`}>{blog.title}</h2>
                <p className={`mb-4 text-gray-700 dark:text-gray-300 ${commonStyles.text}`}>{blog.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => navigate(`/blog/${blog.id}`)}
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                  >
                    Read more
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}