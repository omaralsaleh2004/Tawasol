import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

const CommentComponent = () => {
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
        <Button variant="contained" color="primary">
          POST
        </Button>
      </Box>
    </Card>
  );
};

export default CommentComponent;
