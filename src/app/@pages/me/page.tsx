"use client";

import MainUserInfromation from "@/components/mainUserInformation";
import PostCard from "@/components/postCard";

function Me() {
  return (
    <div className="me-main-div width-full column a-i-c padding-20px gap-40px">
      <MainUserInfromation />
      <PostCard />
    </div>
  );
}

export default Me;
