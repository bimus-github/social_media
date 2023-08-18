"use client";

import MainUserInfromation from "@/components/mainUserInformation";
import CreatingCard from "@/components/creatingPost";
import PostCrad from "@/components/postCrad";

function Me() {
  return (
    <div className="me-main-div width-full column a-i-c padding-20px gap-40px">
      <MainUserInfromation />
      <CreatingCard />
      <PostCrad />
    </div>
  );
}

export default Me;
