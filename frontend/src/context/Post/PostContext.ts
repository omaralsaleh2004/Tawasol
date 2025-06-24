import { createContext, useContext } from "react";
import type { IPost } from "../../types/Post";
// -getPost , -getPosts , deletePost , addPost , addComment
//, like , unlike , removeComment

interface PostContextTypes {
  post: IPost | null;
  posts: IPost[];
  fetchPosts: () => void;
  fetchPost: (id: string) => void;
}

export const PostContext = createContext<PostContextTypes>({
  post: null,
  posts: [],
  fetchPosts: () => {},
  fetchPost: () => {},
});

export const usePost = () => useContext(PostContext);
