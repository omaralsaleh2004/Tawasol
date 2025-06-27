import { useState, type FC, type PropsWithChildren } from "react";

import { useAuth } from "../Auth/AuthContext";
import { BASE_URL } from "../../constants/BaseUrl";
import type { IPost } from "../../types/Post";
import { PostContext } from "./PostContext";

const PostProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [post, setPost] = useState<IPost | null>(null);

  const fetchPost = async (id: string) => {
    try {
      console.log("Calling fetchPost with ID:", id);
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
      console.log("from FetchPost", Post);
      setPost(Post);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllPosts = async () => {
    try {
      console.log("Form the Fetch all Posts");
      const response = await fetch(`${BASE_URL}/post`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setPosts([]);
        return;
      }

      const allPosts = await response.json();
      console.log("from respoonse.ok", allPosts);
      setPosts(allPosts);
    } catch (error) {
      console.error(error);
    }
  };

  const addPost = async (text: string) => {
    try {
      const response = await fetch(`${BASE_URL}/post`, {
        method: "Post",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
        }),
      });
      if (!response.ok) {
        return;
      }

      const Post = await response.json();
      console.log("from Add Post", Post);
      setPosts((prev) => [Post, ...prev]);
      console.log("from postssssssssssssssssssssssssss", posts);
    } catch (error) {
      console.error(error);
    }
  };

  const addLike = async (postId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/post/like/${postId}`, {
        method: "Put",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        return;
      }

      const like = await response.json();
      console.log("from Add Post", like);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, likes: like } : post
        )
      );
      console.log("from postssssssssssssssssssssssssss", like);
    } catch (error) {
      console.error(error);
    }
  };

  const removeLike = async (postId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/post/unlike/${postId}`, {
        method: "Put",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        return;
      }

      const like = await response.json();
      console.log("from Add Post", like);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, likes: like } : post
        )
      );
      console.log("from postssssssssssssssssssssssssss", like);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (postId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/post/${postId}`, {
        method: "Delete",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        return;
      }

      const data = await response.json();
      console.log("from Add Post", data);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        post,
        fetchAllPosts,
        fetchPost,
        addPost,
        addLike,
        removeLike,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
