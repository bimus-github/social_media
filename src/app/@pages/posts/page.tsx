"use client";

import PostCrad from "@/components/postCrad";
import { useAppSelector } from "@/strore/hooks";

function Posts() {
  const messages = useAppSelector((state) => state.messages);

  console.log(messages);

  return (
    <div className="me-main-div width-full column a-i-c padding-20px gap-40px">
      <PostCrad title="Posts" data={messages} />
    </div>
  );
}

export default Posts;
