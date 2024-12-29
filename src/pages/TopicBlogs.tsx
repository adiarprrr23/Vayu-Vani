import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { commonStyles } from '../styles/common';

interface Topic {
  id: string;
  name: string;
  icon: string;
  description: string;
}

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

export function TopicBlogs() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [topicBlogs, setTopicBlogs] = useState<Blog[]>([]);
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchTopicAndBlogs = async () => {
      const { data: topicData, error: topicError } = await supabase
        .from('topics')
        .select('*')
        .eq('id', topicId)
        .single();

      if (topicError) {
        console.error('Error fetching topic:', topicError);
      } else {
        setTopic(topicData as Topic);
      }

      const { data: blogsData, error: blogsError } = await supabase
        .from('posts')
        .select('*')
        .eq('topic_id', topicId);

      if (blogsError) {
        console.error('Error fetching blogs:', blogsError);
      } else {
        setTopicBlogs(blogsData as Blog[]);
      }

      const { data: allBlogsData, error: allBlogsError } = await supabase
        .from('posts')
        .select('*');

      if (allBlogsError) {
        console.error('Error fetching all blogs:', allBlogsError);
      } else {
        setAllBlogs(allBlogsData as Blog[]);
      }
    };

    fetchTopicAndBlogs();
  }, [topicId]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
    } else {
      const results = allBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(query.toLowerCase()) ||
        blog.content.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  if (!topic) {
    return (
      <div className={commonStyles.container}>
        <h1 className={`text-2xl mb-4 ${commonStyles.heading}`}>Topic not found</h1>
        <button
          onClick={() => navigate('/blogs')}
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
        >
          Back to topics
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className={commonStyles.container}>
        <button
          onClick={() => navigate('/blogs')}
          className={`flex items-center gap-2 mb-8 ${commonStyles.text}`}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to topics
        </button>

        <div className="flex items-center gap-3 mb-8">
          <span className="text-4xl">{topic.icon}</span>
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${commonStyles.heading}`}>
              {topic.name}
            </h1>
            <p className={commonStyles.text}>{topic.description}</p>
          </div>
        </div>

        <div className="mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search blogs..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {searchQuery ? (
          <div className="mb-8">
            <h2 className={`text-2xl font-bold mb-4 ${commonStyles.heading}`}>Search Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {searchResults.map((blog) => (
                <div
                  key={blog.id}
                  className={`${commonStyles.card} transition-colors cursor-pointer`}
                  onClick={() => navigate(`/blog/${blog.id}`)}
                >
                  <img
                    src={blog.thumbnail_url}
                    alt={blog.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-6">
                    <h2 className={`text-xl font-semibold mb-2 ${commonStyles.heading}`}>
                      {blog.title}
                    </h2>
                    <p className={`mb-4 ${commonStyles.text}`}>{blog.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(blog.created_at).toLocaleDateString()}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/blog/${blog.id}`);
                        }}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition-colors"
                      >
                        Read more
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <h2 className={`text-2xl font-bold mb-4 ${commonStyles.heading}`}>Blogs in {topic.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topicBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className={`${commonStyles.card} transition-colors cursor-pointer`}
                  onClick={() => navigate(`/blog/${blog.id}`)}
                >
                  <img
                    src={blog.thumbnail_url}
                    alt={blog.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-6">
                    <h2 className={`text-xl font-semibold mb-2 ${commonStyles.heading}`}>
                      {blog.title}
                    </h2>
                    <p className={`mb-4 ${commonStyles.text}`}>{blog.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(blog.created_at).toLocaleDateString()}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/blog/${blog.id}`);
                        }}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition-colors"
                      >
                        Read more
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}