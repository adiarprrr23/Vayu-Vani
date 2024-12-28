import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, FileVideo } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import ReactQuill from 'react-quill';

export function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.from('posts').insert({
        title,
        content,
        thumbnail_url: thumbnail,
        video_url: videoUrl,
        author_id: user?.id,
      });

      if (error) throw error;
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-gray-900 transition-colors">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Create New Blog Post
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm sm:text-lg font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full px-4 py-3 sm:px-6 sm:py-4 text-base sm:text-lg border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300"
            required
          />
        </div>

        <div>
          <label className="block text-sm sm:text-lg font-medium text-gray-700 dark:text-gray-300">
            Content
          </label>
          <ReactQuill
            value={content}
            onChange={setContent}
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
          <label className="block text-sm sm:text-lg font-medium text-gray-700 dark:text-gray-300">
            <Image className="inline-block w-5 h-5 mr-2" />
            Thumbnail URL
          </label>
          <input
            type="url"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            className="mt-2 w-full px-4 py-3 sm:px-6 sm:py-4 text-base sm:text-lg border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm sm:text-lg font-medium text-gray-700 dark:text-gray-300">
            <FileVideo className="inline-block w-5 h-5 mr-2" />
            Reference Video URL
          </label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="mt-2 w-full px-4 py-3 sm:px-6 sm:py-4 text-base sm:text-lg border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 sm:py-4 sm:px-6 text-base sm:text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md disabled:opacity-50"
        >
          {isLoading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}
