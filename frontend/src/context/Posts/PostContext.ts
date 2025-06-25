import { createContext, useContext } from "react";

import type { IPost } from "../../types/Post";

interface PostContextType {
  posts: IPost[];
  fetchAllPosts: () => void;
}

export const PostContext = createContext<PostContextType>({
  posts: [],
  fetchAllPosts: () => {},
});

export const usePost = () => useContext(PostContext);
