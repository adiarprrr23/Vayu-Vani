import { useNavigate } from 'react-router-dom';
import { commonStyles } from '../styles/common';

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

interface TopicCardProps {
  topic: Topic;
  blogs: Blog[];
}

export function TopicCard({ topic, blogs }: TopicCardProps) {
  const navigate = useNavigate();
  const topicBlogs = blogs.filter(blog => blog.topic_id === topic.id);

  return (
    <div className={`${commonStyles.card} transition-colors`}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">{topic.icon}</span>
          <h2 className={`text-xl font-semibold ${commonStyles.heading}`}>
            {topic.name}
          </h2>
        </div>
        <p className={`mb-4 ${commonStyles.text}`}>{topic.description}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {topicBlogs.length} articles
        </p>
        <button
          onClick={() => navigate(`/blogs/topic/${topic.id}`)}
          className={`w-full py-2 px-4 rounded-md ${commonStyles.button.primary} transition-colors`}
        >
          Explore Topic
        </button>
      </div>
    </div>
  );
}