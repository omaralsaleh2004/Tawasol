import { Avatar, Box, Container, Typography } from "@mui/material";
import defaultImage from "../../assests/default.png";
import { useEffect } from "react";
import { usePost } from "../../context/Posts/PostContext";
import { formatDate } from "../../utils";
import CommentComponent from "../../components/CommentCompnent";
import { useParams } from "react-router-dom";
import PostComments from "../../components/PostComments";
import { useUser } from "../../context/User/UserContext";

const CommentPage = () => {
  const { post } = usePost();
  const { id } = useParams();
  const { fetchPost } = usePost();
  const { getUser } = useUser();

  useEffect(() => {
    console.log("from params", id);
    if (id) {
      fetchPost(id);
    }

    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  if (!post) {
    return (
      <Container>
        <Typography>The Post does not exist</Typography>
      </Container>
    );
  }
  return (
    <Container>
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
              {post.text}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Posted at {formatDate(post.date)}
            </Typography>
            <Typography variant="body2" color="text.primary" mt={0.5}>
              {post.name}
            </Typography>
          </Box>
        </Box>
      </Box>
      <CommentComponent />
      <PostComments />
    </Container>
  );
};

export default CommentPage;
