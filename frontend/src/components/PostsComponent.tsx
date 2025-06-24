import { Forum, ThumbDown, ThumbUp } from "@mui/icons-material";
import defaultImage from "../assests/default.png";
import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { usePost } from "../context/Post/PostContext";
import { useEffect } from "react";
import { useUser } from "../context/User/UserContext";

const PostsComponent = () => {
  const { fetchPosts } = usePost();
  const { getUser } = useUser();
  useEffect(() => {
    getUser();
    console.log("from Fetch in Post Component");
    fetchPosts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
          alt="Xavi Hernandez"
          src={defaultImage}
          sx={{ width: 56, height: 56 }}
        />

        <Box flex={1} minWidth={0}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{ wordWrap: "break-word", whiteSpace: "normal" }}
          ></Typography>
          <Typography variant="caption" color="text.secondary">
            Posted at March 2021
          </Typography>
          <Typography variant="body2" color="text.primary" mt={0.5}>
            Xavi Hernandez
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
          <IconButton>
            <ThumbUp />
            <Typography ml={0.5}>0</Typography>
          </IconButton>
          <IconButton>
            <ThumbDown />
            <Typography ml={0.5}>0</Typography>
          </IconButton>
          <Badge badgeContent={10} color="primary">
            <Button
              variant="contained"
              color="primary"
              endIcon={<Forum />}
              sx={{ textTransform: "none", whiteSpace: "nowrap" }}
            >
              Discussion
            </Button>
          </Badge>
        </Box>
      </Box>
    </Box>
  );
};

export default PostsComponent;
