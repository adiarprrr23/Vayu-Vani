import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Blog {
  id: string;
  title: string;
  content: string;
  thumbnail_url: string;
  video_url: string;
  author_id: string;
  created_at: string;
  excerpt: string;
  published: boolean;
}

export function EditBlog() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

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
      }
      setLoading(false);
    };

    const fetchCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUserId(user.id);
      }
    };

    fetchBlog();
    fetchCurrentUser();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blog || !currentUserId) return;

    const { error } = await supabase
      .from('posts')
      .update({
        title: blog.title,
        content: blog.content,
        thumbnail_url: blog.thumbnail_url,
        video_url: blog.video_url,
        excerpt: blog.excerpt,
        published: blog.published,
        author_id: currentUserId,
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating blog:', error);
    } else {
      navigate('/dashboard');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-gray-900 transition-colors">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">Edit Blog</h1>
      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label className="block text-sm sm:text-lg font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input
            type="text"
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            className="mt-2 w-full px-4 py-3 sm:px-6 sm:py-4 text-base sm:text-lg border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300"
            required
          />
        </div>
        <div>
          <label className="block text-sm sm:text-lg font-medium text-gray-700 dark:text-gray-300">Content</label>
          <ReactQuill
            value={blog.content}
            onChange={(value) => setBlog({ ...blog, content: value })}
            className="mt-2 w-full border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-gray-300"
            theme="snow"
            style={{
              minHeight: '300px',
              fontSize: '1rem',
              padding: '1rem',
            }}
          />
        </div>
        <div>
          <label className="block text-sm sm:text-lg font-medium text-gray-700 dark:text-gray-300">Thumbnail URL</label>
          <input
            type="url"
            value={blog.thumbnail_url}
            onChange={(e) => setBlog({ ...blog, thumbnail_url: e.target.value })}
            className="mt-2 w-full px-4 py-3 sm:px-6 sm:py-4 text-base sm:text-lg border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300"
          />
        </div>
        <div>
          <label className="block text-sm sm:text-lg font-medium text-gray-700 dark:text-gray-300">Reference Video URL</label>
          <input
            type="url"
            value={blog.video_url}
            onChange={(e) => setBlog({ ...blog, video_url: e.target.value })}
            className="mt-2 w-full px-4 py-3 sm:px-6 sm:py-4 text-base sm:text-lg border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 sm:py-4 sm:px-6 text-base sm:text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}
