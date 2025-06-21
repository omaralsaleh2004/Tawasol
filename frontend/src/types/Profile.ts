export interface IExperience {
  _id: string;
  title: string;
  company: string;
  location: string;
  from?: Date | null;
  to?: Date | null;
  current: boolean;
  description: string;
}

export interface IaddExperience {
  title: string;
  company: string;
  location: string;
  from?: Date | null;
  to?: Date | null;
  current: boolean;
}

export interface IEducation {
  _id: string;
  school: string;
  degree: string;
  fieldofstudy: string;
  from: Date;
  to: Date;
  current: boolean;
  description: string;
}

export interface ISocial {
  _id: string;
  youtube: string;
  twitter: string;
  facebook: string;
  linkedin: string;
  instagram: string;
  github: string;
}
export interface Profile {
  userId: { _id: string; firstName: string };
  company: string;
  website: string;
  country: string;
  location: string;
  status: string;
  skills: string[];
  bio: string;
  experience: IExperience[];
  education: IEducation[];
  social: ISocial[];
  date: Date;
}
