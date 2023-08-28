/* eslint-disable @next/next/no-img-element */
"use client";
import "@/styles/postCrad/index.css";
import { Message_Type } from "@/types";
import { Card } from "./Card";

interface Props {
  title: string;
  data: Message_Type[];
}

function PostCrad({ title, data }: Props) {
  return (
    <div className="post-card-main-div width-90 column gap-40px bg-w-c sh-x-s padding-30px b-r-20px">
      <div className="title-div a-i-c gap-10px">
        <p className="title-p t-d-l-u c-2">{title}</p>
      </div>
      <div
        style={{
          overflowY: "auto",
        }}
        className="masonry-component width-full height-full"
      >
        {data.length !== 0 &&
          data.map((message, i) => <Card data={message} key={i} />)}
      </div>
    </div>
  );
}

export default PostCrad;
