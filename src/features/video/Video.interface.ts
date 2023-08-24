import User from "../user/User.interface";
import VideoComment from "./VideoComment.interface";

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