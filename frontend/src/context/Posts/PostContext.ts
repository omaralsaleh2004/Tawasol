import { createContext, useContext } from "react";

import type { IPost } from "../../types/Post";

interface PostContextType {
  posts: IPost[];
  fetchAllPosts: () => void;
  addPost: (text: string) => void;
}

export const PostContext = createContext<PostContextType>({
  posts: [],
  fetchAllPosts: () => {},
  addPost: () => {},
});

export const usePost = () => useContext(PostContext);
