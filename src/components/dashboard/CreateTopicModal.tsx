import { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { commonStyles } from '../../styles/common';

interface CreateTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTopicCreated: () => void;
}

export function CreateTopicModal({ isOpen, onClose, onTopicCreated }: CreateTopicModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { error: createError } = await supabase
        .from('topics')
        .insert({
          name: formData.name,
          description: formData.description,
          icon: formData.icon
        });

      if (createError) throw createError;

      onTopicCreated();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create topic');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${commonStyles.card} w-full max-w-md p-6`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-semibold ${commonStyles.heading}`}>
            Create New Topic
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${commonStyles.text}`}>
              Topic Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={commonStyles.input}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${commonStyles.text}`}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className={`${commonStyles.input} min-h-[100px]`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${commonStyles.text}`}>
              Icon (emoji)
            </label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
              className={commonStyles.input}
              placeholder="🌟"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-md ${commonStyles.button.secondary}`}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className={`px-4 py-2 rounded-md ${commonStyles.button.primary}`}
            >
              {isLoading ? 'Creating...' : 'Create Topic'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}