import { useState, type FC, type PropsWithChildren } from "react";
import { PostContext } from "./PostContext";
import type { IPost } from "../../types/Post";
import { BASE_URL } from "../../constants/BaseUrl";
import { useAuth } from "../Auth/AuthContext";

const PostProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
  const [post, setPost] = useState<IPost | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/post`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setPosts([]);
        return;
      }

      const Posts = await response.json();
      console.log("from Posts ", Posts);
      setPosts(Posts);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPost = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setPost(null);
        return;
      }

      const Post = await response.json();
      console.log("from Post ", Post);
      setPost(Post);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PostContext.Provider value={{ post, posts, fetchPosts, fetchPost }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
