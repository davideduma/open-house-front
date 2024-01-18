import { CommentPeople } from "./CommentPeople";

export interface HomeContentPost {
    id: string;
    likes: number;
    commentPeople: CommentPeople[];
    imgUserPost: string;
    userPost: string;
    ownerMural: string;
    resume: string;
    imgPost: string;
    comment: string;
  }
  