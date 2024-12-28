import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { commonStyles } from '../../styles/common';
import { CreateTopicModal } from './CreateTopicModal';

interface Topic {
  id: string;
  name: string;
  icon: string;
}

interface TopicSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function TopicSelect({ value, onChange }: TopicSelectProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const { data, error } = await supabase
        .from('topics')
        .select('*');

      if (error) {
        console.error('Error fetching topics:', error);
      } else {
        setTopics(data);
      }
    };

    fetchTopics();
  }, []);

  return (
    <div className="flex gap-2">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${commonStyles.input} flex-1`}
      >
        <option value="">Select Topic</option>
        {topics.map((topic) => (
          <option key={topic.id} value={topic.id}>
            {topic.icon} {topic.name}
          </option>
        ))}
      </select>
      
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={`px-3 py-2 rounded-md ${commonStyles.button.secondary}`}
        title="Create new topic"
      >
        <Plus className="w-5 h-5" />
      </button>

      <CreateTopicModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTopicCreated={() => {
          // Refresh topics list
          window.location.reload();
        }}
      />
    </div>
  );
}