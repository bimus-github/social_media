export enum ErrorMessages {
  "NOT_ERROR" = -1,
  "PASSWORD_INCORRECT" = 0,
  "PASSWORD_SHORT" = 1,
  "USER_NOT_FOUND" = 2,
  "ALREADY_HAVE_USER" = 3,
  "NETWORK_REQUEST_FAILED" = 4,
}

export type NavbarRoutes = {
  name: string;
  path: string;
  icon: JSX.Element;
};

export type User_Type = {
  id: string;
  about: string;
  firstname: string;
  lastname: string;
  location: string;
  username: string;
  imageUrl: string;
  job: string;
};

export type Message_Type = {
  id: string;
  message: string;
  userId: string;
  imageUrl: string;
  username: string;
  firstname: string;
  userImage: string;
  job: string;
  createdDate: string;
  updatedDate: string;
  likes: string[];
  comments: Comment_Type[];
  typeOfFile: File_Type;
  visibile: boolean;
};

export type Comment_Type = {
  userId: string;
  userImage: string;
  username: string;
  comment: string;
};

export enum File_Type {
  "NONE" = 0,
  "IMAGE" = 1,
  "VIDEO" = 2,
  "OTHER" = 3,
}
