export type TUser = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

export type TComment = {
  content: string;
  createdAt: string;
  id: number;
  replyingTo?: string;
  replies?: TComment[];
  score: number;
  user: TUser;
};

export type TNewComment = {
  content: string;
  user: TUser;
  parentIdx: number[];
  replyingTo?: string;
};

export type TPatchComment = {
  type: "DELETE" | "EDIT" | "SCORE";
  parentIdx: number[];
  content?: string;
  replyingTo?: string;
  score?: number;
};
