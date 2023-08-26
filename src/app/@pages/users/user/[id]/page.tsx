/* eslint-disable @next/next/no-img-element */

"use client";

import Modal from "@/components/modalForCard";
import PostCrad from "@/components/postCrad";
import { useAppSelector } from "@/strore/hooks";
import { Message_Type, User_Type } from "@/types";
import React, { useEffect, useState } from "react";
import "@/styles/accountPage/index.css";

function UserPage({ params }: { params: { id: string } }) {
  const users = useAppSelector((state) => state.users);
  const messages = useAppSelector((state) => state.messages);
  const [hisPosts, setHisPosts] = useState<Message_Type[]>();
  const [user, setUser] = useState<User_Type>();

  useEffect(() => {
    const user = users.filter((user) => user.id === params.id)[0];
    const messagesOfUser = messages.filter(
      (message) => message.userId === params.id
    );
    setHisPosts(messagesOfUser);
    setUser(user);
  }, [messages, params.id, users]);

  if (!user) return <div>No such user</div>;

  return (
    <Modal>
      <div
        className="account-page-div a-i-c column gap-20px padding-b-10px"
        style={{
          overflowY: "auto",
          height: "600px",
        }}
      >
        <div className="user-img-div height-200px a-i-c j-c-c b-r-100px">
          <img
            src={user.imageUrl}
            alt=""
            className="img height-full b-r-50px"
          />
        </div>

        <div className="name-job-div column  a-i-c gap-10px ">
          <p className="name-div font-s-25px c-2">
            {user.firstname} {user.lastname}
          </p>
          <p className="job-p font-s-20px c-2">{user.job}</p>
        </div>

        <div className="about-div width-50">
          <p className="about-p">{user.about}</p>
        </div>

        <div className="posts-div width-full a-i-c j-c-c">
          {hisPosts?.length !== 0 && hisPosts ? (
            <PostCrad data={hisPosts} title="User's posts" />
          ) : (
            <PostCrad data={[]} title="He/She has not any posts yet!" />
          )}
        </div>
      </div>
    </Modal>
  );
}

export default UserPage;
