export interface VideoComment {
  user_id: number;
  video_url: string;
  owner: string;
  content: string;
  createdAt: number;
  modified: boolean;
  likes: number;
  dislikes: number;
  isliked: number;
}