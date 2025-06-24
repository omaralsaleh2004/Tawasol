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
      console.log("Before fetch call");
      const response = await fetch(`${BASE_URL}/post`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("After fetch call");

      if (!response.ok) {
        console.log("Error fetching posts:", response.status);
        setPosts([]);
        return;
      }

      const posts = await response.json();
      console.log("Fetched posts:", posts);
      setPosts(posts);
    } catch (error) {
      console.error("FetchPosts exception:", error);
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
