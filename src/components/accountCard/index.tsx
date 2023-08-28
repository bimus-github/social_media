/* eslint-disable @next/next/no-img-element */
"use client";

import { useAppSelector } from "@/strore/hooks";
import "@/styles/accountCard/index.css";
import { User_Type } from "@/types";
import Link from "next/link";

function AccountCard({ users }: { users: User_Type[] }) {
  return (
    <div className="account-card-main-div width-90 column gap-40px bg-w-c sh-x-s padding-30px b-r-20px">
      <div className="title-div a-i-c gap-10px">
        <p className="title-p t-d-l-u c-2">Users</p>
      </div>
      <div style={{ overflowY: "auto" }} className="account-card-div">
        {users.map((user, i) => (
          <Card key={i} user={user} />
        ))}
      </div>
    </div>
  );
}

export default AccountCard;

interface CardProps {
  user: User_Type;
}

const Card = ({ user }: CardProps) => {
  return (
    <div className="card-div sh-x-s b-r-20px padding-t-20px padding-b-20px">
      <div className="user-img-div b-r-100px a-i-c j-c-c">
        <img src={user.imageUrl} alt="" className="img height-full" />
      </div>

      <Link href={`users/user/${user.id}`}>
        <div className="user-name-div gap-5px">
          <p className="firstname-p">{user.firstname}</p>
          <p className="lastname-p">{user.lastname}</p>
        </div>
      </Link>

      <div className="user-job-div">
        <p className="job-p">{user.job}</p>
      </div>

      <div className="line-div" />

      <div className="user-about-div width-80">
        <p className="about-p">{user.about}</p>
      </div>

      <div className="user-username-div width-80 gap-5px">
        <p className="see-profile-p">See more:</p>
        <Link href={`users/user/${user.id}`}>
          <p className="username-p">{user.username}</p>
        </Link>
      </div>
    </div>
  );
};
