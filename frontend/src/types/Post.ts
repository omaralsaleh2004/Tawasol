export interface ILiks {
  userId: string;
  _id: string;
}

export interface IComments {
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
  likes: ILiks[];
  comments: IComments[];
  date: Date;
}
