export interface Comment {
  id?: number;
  createdAt: Date;
  updatedAt: Date;
  postId?: number;
  message: string;
  userId: string;
}
