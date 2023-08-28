import VideoComment from "../../components/CommentSection/VideoComment.interface";
import User from "../user/User.interface";

export default interface Video {
  owner: User;
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