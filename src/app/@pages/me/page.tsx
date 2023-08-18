"use client";

import MainUserInfromation from "@/components/mainUserInformation";
import CreatingCard from "@/components/creatingPost";

function Me() {
  return (
    <div className="me-main-div width-full column a-i-c padding-20px gap-40px">
      <MainUserInfromation />
      <CreatingCard />
    </div>
  );
}

export default Me;
