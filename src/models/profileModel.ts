import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IExperience {
  title: string;
  company: string;
  location: string;
  from: Date;
  to: Date;
  current: boolean;
  description: string;
}

export interface IEducation {
  school: string;
  degree: string;
  fieldofstudy: string;
  from: Date;
  to: Date;
  current: boolean;
  description: string;
}

export interface ISocial {
  youtube: string;
  twitter: string;
  facebook: string;
  linkedin: string;
  instagram: string;
  github: string;
}
interface IProfile extends Document {
  userId: string | ObjectId;
  company: string;
  website: string;
  country: string;
  location: string;
  status: string;
  skills: [string];
  bio: string;
  experience: [IExperience];
  education: [IEducation];
  social: [ISocial];
  data: Date;
}

const experienceSchema = new Schema<IExperience>({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  from: { type: Date, required: true },
  to: { type: Date },
  current: { type: Boolean, default: false },
  description: { type: String },
});

const educationSchema = new Schema<IEducation>({
  school: { type: String, required: true },
  degree: { type: String, required: true },
  fieldofstudy: { type: String, required: true },
  from: { type: Date, required: true },
  to: { type: Date },
  current: { type: Boolean, default: false },
  description: { type: String },
});

const socialSchema = new Schema<ISocial>({
  youtube: { type: String },
  facebook: { type: String },
  github: { type: String },
  instagram: { type: String },
  linkedin: { type: String },
  twitter: { type: String },
});

const profileSchema = new Schema<IProfile>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  company: { type: String },
  website: { type: String },
  country: { type: String },
  location: { type: String },
  status: { type: String, required: true },
  skills: { type: [String], required: true },
  bio: { type: String },
  experience: { type: [experienceSchema], required: true },
  education: { type: [educationSchema], required: true },
  social: { type: [socialSchema], required: true },
  data: { type: Date, default: Date.now },
});

export const profileModel = mongoose.model("Proflie", profileSchema);
