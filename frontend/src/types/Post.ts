export interface ILike {
  userId: string;
  _id: string;
}

export interface IComment {
  _id: string;
  userId: string;
  text: string;
  firstName: string;
  lastName: string;
  date: Date;
}

export interface IPost {
  _id: string;
  userId: string;
  text: string;
  firstName: string;
  lastName: string;
  likes: ILike[];
  comments: IComment[];
  date: Date;
}
