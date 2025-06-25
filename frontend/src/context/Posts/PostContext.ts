import { createContext, useContext } from "react";

import type { IPost } from "../../types/Post";

interface PostContextType {
  posts: IPost[];
  fetchAllPosts: () => void;
  addPost: (text: string) => void;
  addLike: (postId: string) => void;
  removeLike: (postIt: string) => void;
}

export const PostContext = createContext<PostContextType>({
  posts: [],
  fetchAllPosts: () => {},
  addPost: () => {},
  addLike: () => {},
  removeLike: () => {},
});

export const usePost = () => useContext(PostContext);
