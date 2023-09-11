import VideoComment from "../../components/VideoViewer/components/CommentSection/VideoComment.interface"

export default interface Video {
  creator_id: number;
  title: string;
  description: string;
  url: string;
  img: string;
  length: number;
  views: number;
  createdAt: number;
  likes?: number;
  dislikes?: number;
  comments?: Array<VideoComment>;
}