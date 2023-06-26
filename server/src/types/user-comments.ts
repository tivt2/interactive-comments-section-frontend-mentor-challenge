type TUser = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

type TComment = {
  content: string;
  createdAt: string;
  id: number;
  replyingTo?: string;
  replies: TComment[];
  score: number;
  user: TUser;
};

type TNewComment = {
  content: string;
  user: TUser;
  parentIdx: number[];
  replyingTo?: string;
};

type TJsonData = {
  currentUser: TUser;
  comments: TComment[];
};

export { TUser, TComment, TNewComment, TJsonData };
