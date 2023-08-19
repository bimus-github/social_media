export default function Layout(props: {
  children: React.ReactNode;
  me: React.ReactNode;
  posts: React.ReactNode;
  users: React.ReactNode;
}) {
  return (
    <>
      {props.children}
      {props.users}
      {props.posts}
      {props.me}
    </>
  );
}
