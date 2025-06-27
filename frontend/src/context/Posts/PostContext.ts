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
});

export const usePost = () => useContext(PostContext);
