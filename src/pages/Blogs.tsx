import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { commonStyles } from '../styles/common';
import { TopicCard } from '../components/TopicCard';

interface Blog {
  id: string;
  title: string;
  content: string;
  thumbnail_url: string;
  video_url: string;
  author_id: string;
  created_at: string;
  excerpt: string;
  topic_id: string;
}

interface Topic {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export function Blogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchBlogsAndTopics = async () => {
      const { data: blogsData, error: blogsError } = await supabase.from('posts').select('*');
      if (blogsError) {
        console.error('Error fetching blogs:', blogsError);
      } else {
        setBlogs(blogsData as Blog[]);
      }

      const { data: topicsData, error: topicsError } = await supabase.from('topics').select('*');
      if (topicsError) {
        console.error('Error fetching topics:', topicsError);
      } else {
        setTopics(topicsData as Topic[]);
      }
    };

    fetchBlogsAndTopics();
  }, []);

  const filteredTopics = topics.filter(topic =>
    topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase())
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
                placeholder="Search topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300 ${commonStyles.input}`}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTopics.map((topic) => (
            <TopicCard 
              key={topic.id} 
              topic={topic} 
              blogs={blogs.filter(blog => blog.topic_id === topic.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}