export interface ILike {
  userId: string;
  _id: string;
}

export interface IComment {
  _id: string;
  userId: string;
  text: string;
  name: string;
  date: Date;
}

export interface IPost {
  userId: string;
  text: string;
  name: string;
  likes: ILike[];
  comments: IComment[];
  date: Date;
}