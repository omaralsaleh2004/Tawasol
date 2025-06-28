import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import dotenv from "dotenv";
import cors from "cors";
import profileRoute from "./routes/profileRoute";
import postRoute from "./routes/postRoute";

dotenv.config();
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => console.log("mongo connected"))
  .catch(() => console.log("Failed to connect"));

app.use(express.static(__dirname + "/public"));

app.use("/user", userRoute);
app.use("/profile", profileRoute);
app.use("/post", postRoute);
app.listen(port, () => {
  console.log(`server is running at : http://localhost:${port}`);
});
