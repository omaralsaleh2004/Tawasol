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

const PostPage = () => {
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
          <Button variant="contained" color="primary">
            POST
          </Button>
        </Box>
      </Card>
      <PostsComponent />
    </Container>
  );
};

export default PostPage;
