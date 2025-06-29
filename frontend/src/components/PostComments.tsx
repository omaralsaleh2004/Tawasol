import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { usePost } from "../context/Posts/PostContext";
import { Delete } from "@mui/icons-material";
import defaultImage from "../assests/default.png";
import { formatDate } from "../utils";
import { useUser } from "../context/User/UserContext";
import { useEffect, useState } from "react";
import { getProfileImageUrl } from "../utils/useProfileImage";

const PostComments = () => {
  const { post, deleteComment } = usePost();
  const [commentImages, setCommentImages] = useState<Record<string, string>>(
    {}
  );
  const { user } = useUser();

  useEffect(() => {
    const loadImages = async () => {
      if (!post) return;

      const imageMap: Record<string, string> = {};

      for (const comment of post.comments) {
        const userId = comment.userId;
        if (!commentImages[userId]) {
          const img = await getProfileImageUrl(userId);
          imageMap[userId] = img;
        }
      }

      setCommentImages((prev) => ({ ...prev, ...imageMap }));
    };

    loadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  return (
    <Container>
      {post
        ? post.comments.map((comment) => (
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
                  src={commentImages[comment.userId] || defaultImage}
                  sx={{ width: 56, height: 56 }}
                />

                <Box flex={1} minWidth={0}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{ wordWrap: "break-word", whiteSpace: "normal" }}
                  >
                    {comment.text}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Posted at {formatDate(comment.date)}
                  </Typography>
                  <Typography variant="body2" color="text.primary" mt={0.5}>
                    {comment.firstName} {comment.lastName}
                  </Typography>
                </Box>
                {user?._id === comment.userId ? (
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    flexWrap="wrap"
                  >
                    <Button
                      onClick={() => deleteComment(post._id, comment._id)}
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
                  </Box>
                ) : null}
              </Box>
            </Box>
          ))
        : null}
    </Container>
  );
};

export default PostComments;
