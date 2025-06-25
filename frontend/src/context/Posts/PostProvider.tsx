import { useState, type FC, type PropsWithChildren } from "react";

import { useAuth } from "../Auth/AuthContext";
import { BASE_URL } from "../../constants/BaseUrl";
import type { IPost } from "../../types/Post";
import { PostContext } from "./PostContext";

const PostProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
  const [posts, setPosts] = useState<IPost[]>([]);

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

  return (
    <PostContext.Provider
      value={{
        posts,
        fetchAllPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
