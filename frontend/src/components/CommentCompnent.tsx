import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { usePost } from "../context/Posts/PostContext";

const CommentComponent = () => {
  const { post, addComment } = usePost();
  const [error, setError] = useState("");
  const CommentRef = useRef<HTMLInputElement>(null);
  const handleNewComment = (postId: string) => {
    const text = CommentRef.current?.value;
    if (!text) {
      setError("Text is required to add a comment");
      return;
    }
    addComment(postId, text);
    setError("");
  };
  if (!post) {
    return (
      <Box>
        <Typography>Post not Found</Typography>
      </Box>
    );
  }
  return (
    <Card
      sx={{
        maxWidth: 800,
        margin: "auto",
        mt: 3,
        boxShadow: 3,
        borderRadius: 2,
        height: 250,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          align="center"
          color="primary"
          fontWeight="bold"
          gutterBottom
        >
          Leave a comment
        </Typography>

        <TextField
          inputRef={CommentRef}
          placeholder="Enter your comment"
          variant="standard"
          fullWidth
          multiline
          rows={0.5}
        />
      </CardContent>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          px: 2,
          pb: 2,
        }}
      >
        <Button
          onClick={() => handleNewComment(post?._id)}
          variant="contained"
          color="primary"
        >
          POST
        </Button>
      </Box>
      {error ? <Typography color="warning">{error}</Typography> : null}
    </Card>
  );
};

export default CommentComponent;
