import { Delete, Forum, ThumbDown, ThumbUp } from "@mui/icons-material";
import defaultImage from "../assests/default.png";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useUser } from "../context/User/UserContext";
import { usePost } from "../context/Posts/PostContext";
import { formatDate } from "../utils";
import { useNavigate } from "react-router-dom";
import { getProfileImageUrl } from "../utils/useProfileImage";

const PostsComponent = () => {
  const [postImages, setPostImages] = useState<Record<string, string>>({});
  const { fetchAllPosts, posts, post, addLike, removeLike, deletePost } =
    usePost();
  const { user, getUser } = useUser();
  const navigate = useNavigate();
  const handleAddLike = (postId: string) => {
    addLike(postId);
  };
  const handleRemoveLike = (postId: string) => {
    removeLike(postId);
  };

  const handleCommentPage = (id: string) => {
    //fetchPost(id);
    navigate(`/comment/${id}`);
    console.log(post);
  };
  useEffect(() => {
    getUser();
    fetchAllPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const imageMap: Record<string, string> = {};
      for (const post of posts) {
        const userId = post.userId;
        const imageUrl = await getProfileImageUrl(userId);
        imageMap[userId] = imageUrl;
      }
      setPostImages(imageMap);
    };

    fetchImages();
  }, [posts]);
  console.log(posts);
  return (
    <Container>
      {posts
        ? posts.map((post) => (
            <Box
              sx={{
                margin: "auto",
                mt: 3,
                boxShadow: 3,
                width: "100%",
                maxWidth: 800,
                borderRadius: 2,
                padding: 3,
              }}
            >
              <Box display="flex" gap={2} flexWrap="wrap">
                <Avatar
                  alt="Profile Picture"
                  src={postImages[post.userId] || defaultImage}
                  sx={{ width: 56, height: 56 }}
                />

                <Box flex={1} minWidth={0}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{ wordWrap: "break-word", whiteSpace: "normal" }}
                  >
                    {post.text}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Posted at {formatDate(post.date)}
                  </Typography>
                  <Typography variant="body2" color="text.primary" mt={0.5}>
                    {post.firstName} {post.lastName}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                  <IconButton onClick={() => handleAddLike(post._id)}>
                    <ThumbUp />
                    <Typography ml={0.5}>{post.likes.length}</Typography>
                  </IconButton>
                  <IconButton onClick={() => handleRemoveLike(post._id)}>
                    <ThumbDown />
                  </IconButton>
                  <Badge badgeContent={post.comments.length} color="primary">
                    <Button
                      onClick={() => handleCommentPage(post._id)}
                      variant="contained"
                      color="primary"
                      endIcon={<Forum />}
                      sx={{ textTransform: "none", whiteSpace: "nowrap" }}
                    >
                      Discussion
                    </Button>
                  </Badge>
                  {post.userId === user?._id ? (
                    <Button
                      onClick={() => deletePost(post._id)}
                      variant="contained"
                      color="primary"
                      sx={{
                        width: "10px",
                        textTransform: "none",
                        whiteSpace: "nowrap",
                        marginLeft: "6px",
                      }}
                    >
                      <Delete />
                    </Button>
                  ) : null}
                </Box>
              </Box>
            </Box>
          ))
        : null}
    </Container>
  );
};

export default PostsComponent;
