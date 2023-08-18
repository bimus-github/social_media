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
  imageUrl: string;
  username: string;
  firstname: string;
};
