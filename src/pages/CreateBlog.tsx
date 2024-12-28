import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, FileVideo, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { TopicSelect } from '../components/dashboard/TopicSelect';
import { commonStyles } from '../styles/common';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

export function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [topicId, setTopicId] = useState('');
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
        topic_id: topicId,
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className={`${commonStyles.container} max-w-4xl`}>
        <h1 className={`text-3xl font-bold mb-8 ${commonStyles.heading}`}>
          Create New Blog Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${commonStyles.text}`}>
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={topicId}
              onChange={(value) => setTopicId(value)}
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
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
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
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
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

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className={`px-4 py-2 rounded-md ${commonStyles.button.secondary}`}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 rounded-md ${commonStyles.button.primary} disabled:opacity-50 flex items-center`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Post'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}