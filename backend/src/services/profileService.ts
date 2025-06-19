import {
  IEducation,
  IExperience,
  ISocial,
  profileModel,
} from "../models/profileModel";

interface Profile {
  userId: string;
  company: string;
  website: string;
  country: string;
  location: string;
  status: string;
  skills: [string] | any;
  bio: string;
  experience: [IExperience];
  education: [IEducation];
  social: [ISocial];
  date: Date;
}

export const addorEditPost = async ({
  userId,
  company,
  website,
  country,
  location,
  status,
  skills,
  bio,
  experience,
  education,
  social,
  date,
}: Profile) => {
  if (!skills || !status) {
    return {
      data: "Please check if you have enterd Skills and status !",
      statusCode: 400,
    };
  }

  const profile = {
    userId,
    website,
    skills: Array.isArray(skills)
      ? skills
      : skills.split(",").map((skill: string) => skill.trim()),
    country,
    location,
    bio,
    date,
    company,
    experience,
    education,
    social,
    status,
  };

  const userProfile = await profileModel.findOneAndUpdate(
    {
      userId,
    },
    { $set: profile },
    { new: true, upsert: true }
  );
  return { data: userProfile, statusCode: 200 };
};
