import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Image, FileVideo, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { TopicSelect } from '../components/dashboard/TopicSelect';
import { commonStyles } from '../styles/common';
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
  topic_id: string;
}

export function EditBlog() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { user } = useAuth();

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
      setIsLoading(false);
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

    setIsUpdating(true);

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
        topic_id: blog.topic_id,
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating blog:', error);
    } else {
      navigate('/dashboard');
    }

    setIsUpdating(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className={`${commonStyles.container} max-w-4xl`}>
        <h1 className={`text-3xl font-bold mb-8 ${commonStyles.heading}`}>
          Edit Blog Post
        </h1>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${commonStyles.text}`}>
              Title
            </label>
            <input
              type="text"
              value={blog.title}
              onChange={(e) => setBlog({ ...blog, title: e.target.value })}
              className={commonStyles.input}
              required
              minLength={5}
              maxLength={100}
            />
          </div>

          {/* Topic Select */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${commonStyles.text}`}>
              Topic
            </label>
            <TopicSelect
              value={blog.topic_id}
              onChange={(value) => setBlog({ ...blog, topic_id: value })}
            />
          </div>

          {/* Thumbnail URL Input */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${commonStyles.text}`}>
              <Image className="inline-block w-5 h-5 mr-2" />
              Thumbnail URL
            </label>
            <input
              type="url"
              value={blog.thumbnail_url}
              onChange={(e) => setBlog({ ...blog, thumbnail_url: e.target.value })}
              className={commonStyles.input}
            />
          </div>

          {/* Video URL Input */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${commonStyles.text}`}>
              <FileVideo className="inline-block w-5 h-5 mr-2" />
              Reference Video URL
            </label>
            <input
              type="url"
              value={blog.video_url}
              onChange={(e) => setBlog({ ...blog, video_url: e.target.value })}
              className={commonStyles.input}
              placeholder="https://youtube.com/..."
            />
          </div>

          {/* Content Textarea */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${commonStyles.text}`}>
              Content
            </label>
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

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className={`px-4 py-2 rounded-md ${commonStyles.button.secondary}`}
              disabled={isUpdating}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className={`px-6 py-2 rounded-md ${commonStyles.button.primary} disabled:opacity-50 flex items-center`}
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Blog'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}