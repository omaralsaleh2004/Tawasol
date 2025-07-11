import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface ILiks {
  userId: string | ObjectId;
}

export interface IComments {
  _id?: ObjectId | string;
  userId: string | ObjectId;
  text: string;
  firstName: string;
  lastName: string;
  date: Date;
}

interface IPost extends Document {
  userId: string | ObjectId;
  text: string;
  firstName: string;
  lastName: string;
  likes: ILiks[];
  comments: IComments[];
  date: Date;
}

const likesSchema = new Schema<ILiks>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const commentsSchema = new Schema<IComments>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  date: { type: Date, default: Date.now },
});

const postSchema = new Schema<IPost>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  likes: { type: [likesSchema] },
  comments: { type: [commentsSchema] },
  date: { type: Date, default: Date.now },
});

export const postModel = mongoose.model("Post", postSchema);
