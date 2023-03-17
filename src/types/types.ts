export type postsApiReponse = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type commentApiResponse = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};
