export enum ErrorMessages {
  "NOT_ERROR" = -1,
  "PASSWORD_INCORRECT" = 0,
  "PASSWORD_SHORT" = 1,
  "USER_NOT_FOUND" = 2,
  "ALREADY_HAVE_USER" = 3,
}

export type NavbarRoutes = {
  name: string;
  path: string;
  icon: JSX.Element;
};
