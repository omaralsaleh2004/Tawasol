import { createContext, useContext } from "react";

import type { IPost } from "../../types/Post";

interface PostContextType {
  posts: IPost[];
  post: IPost | null;
  fetchAllPosts: () => void;
  fetchPost: (id: string) => void;
  addPost: (text: string) => void;
  addLike: (postId: string) => void;
  removeLike: (postIt: string) => void;
  deletePost: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  deleteComment: (postId: string, commentId: string) => void;
}

export const PostContext = createContext<PostContextType>({
  posts: [],
  post: null,
  fetchAllPosts: () => {},
  fetchPost: () => {},
  addPost: () => {},
  addLike: () => {},
  removeLike: () => {},
  deletePost: () => {},
  addComment: () => {},
  deleteComment: () => {},
});

export const usePost = () => useContext(PostContext);
