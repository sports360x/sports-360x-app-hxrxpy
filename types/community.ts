
export interface CommunityPost {
  id: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  league?: string;
}
