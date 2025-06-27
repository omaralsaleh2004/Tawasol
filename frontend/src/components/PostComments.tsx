import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { usePost } from "../context/Posts/PostContext";
import { Delete } from "@mui/icons-material";
import defaultImage from "../assests/default.png";
import { formatDate } from "../utils";
import { useUser } from "../context/User/UserContext";

const PostComments = () => {
  const { post, deleteComment } = usePost();
  const { user } = useUser();
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
                  src={defaultImage}
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
                    {comment.name}
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
