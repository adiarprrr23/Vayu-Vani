import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import DOMPurify from 'dompurify';

interface Blog {
  id: string;
  title: string;
  content: string;
  thumbnail_url: string;
  video_url: string;
  author_id: string;
  created_at: string;
  excerpt: string;
}

interface Author {
  name: string;
  email: string;
}

export function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [author, setAuthor] = useState<Author | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipTimeout, setTooltipTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      const { data: blogData, error: blogError } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (blogError) {
        console.error('Error fetching blog:', blogError);
      } else {
        setBlog(blogData as Blog);

        const { data: usersData, error: usersError } = await supabase.auth.admin.listUsers();
        if (usersError) {
          console.error('Error fetching users:', usersError);
        } else {
          const authorData = usersData.users.find((user: any) => user.id === blogData.author_id);
          if (authorData) {
            setAuthor({
              name: authorData.user_metadata?.name || 'Unknown',
              email: authorData.email || 'Unknown',
            });
          }
        }
      }
    };

    fetchBlog();
  }, [id]);

  const handleAdminClick = () => {
    if (!isLargeScreen) {
      if (tooltipTimeout) {
        clearTimeout(tooltipTimeout);
      }
      setShowTooltip(true);
      const timeout = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
      setTooltipTimeout(timeout);
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (!event.target || !(event.target as HTMLElement).closest('.author-tooltip')) {
      setShowTooltip(false);
      if (tooltipTimeout) {
        clearTimeout(tooltipTimeout);
      }
    }
  };

  useEffect(() => {
    if (showTooltip && !isLargeScreen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showTooltip, isLargeScreen]);

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center bg-white dark:bg-gray-900 transition-colors">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Blog not found</h1>
        <button
          onClick={() => navigate('/blogs')}
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-600 font-medium"
        >
          Back to blogs
        </button>
      </div>
    );
  }

  const getEmbedUrl = (url: string) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white dark:bg-gray-900 transition-colors">
      <button
        onClick={() => navigate('/blogs')}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to blogs
      </button>

      <img
        src={blog.thumbnail_url}
        alt={blog.title}
        className="w-full lg:h-[500px] object-cover rounded-lg mb-8 object-top"
      />

      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{blog.title}</h1>

      <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400 mb-8">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          <span>{new Date(blog.created_at).toLocaleDateString()}</span>
        </div>
        <div
          className="flex items-center gap-2 relative author-tooltip"
          onClick={handleAdminClick}
          onMouseEnter={isLargeScreen ? () => setShowTooltip(true) : undefined}
          onMouseLeave={isLargeScreen ? () => setShowTooltip(false) : undefined}
        >
          <User className="w-5 h-5" />
          <span className="admin-text cursor-pointer">Admin</span>
          {showTooltip && author && (
            <div className="absolute left-0 mt-2 w-48 p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-10">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{author.name}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{author.email}</p>
            </div>
          )}
        </div>
      </div>

      <div
        className="prose max-w-none dark:prose-dark dark:text-white" // Ensure text color is white in dark mode
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(blog.content),
        }}
      ></div>

      {blog.video_url && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Reference Video</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={getEmbedUrl(blog.video_url)}
              title="Reference Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-[400px] rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
