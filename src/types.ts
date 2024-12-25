export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  thumbnail_url?: string;
  video_url?: string;
  author_id: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}