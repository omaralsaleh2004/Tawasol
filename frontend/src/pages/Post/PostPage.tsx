import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import PostsComponent from "../../components/PostsComponent";
import { usePost } from "../../context/Posts/PostContext";
import { useEffect, useRef, useState } from "react";
import MoonLoader from "react-spinners/moonLoader";

const PostPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { addPost, fetchAllPosts } = usePost();
  const handleAddPost = async () => {
    const text = textRef.current?.value;
    if (!text) {
      setError("Check submitted data");
      return;
    }
    addPost(text);
    fetchAllPosts();
    setError("");
  };
  const textRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <MoonLoader size={50} color="#1976d2" />
      </Box>
    );
  }
  return (
    <Container>
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
            Create Post
          </Typography>

          <TextField
            inputRef={textRef}
            placeholder="What's on your mind?"
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
          <Button onClick={handleAddPost} variant="contained" color="primary">
            POST
          </Button>
        </Box>
        {error ? <Typography color="warning">{error}</Typography> : ""}
      </Card>
      <PostsComponent />
    </Container>
  );
};

export default PostPage;
