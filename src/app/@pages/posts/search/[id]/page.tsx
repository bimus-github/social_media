"use client";
import Modal from "@/components/modalForCard";
import PostCrad from "@/components/postCrad";
import { useAppSelector } from "@/strore/hooks";
import { Message_Type } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function SearchPost({ params }: { params: { id: string } }) {
  const pathname = usePathname();
  const messages = useAppSelector((state) => state.messages);
  let data: Message_Type[] = messages;

  if (!pathname.includes("users")) {
    data = messages.filter(
      (message) =>
        message.message.toLocaleLowerCase().includes(params.id) ||
        message.job.toLocaleLowerCase().includes(params.id) ||
        message.firstname.toLowerCase().includes(params.id)
    );
  }

  console.log(data);

  return (
    <Modal>
      <div
        style={{
          overflowY: "auto",
          height: "500px",
          padding: "20px",
        }}
      >
        {data.length !== 0 ? (
          <PostCrad data={data} title="Searching Posts" />
        ) : (
          <p>There is no such post!</p>
        )}
      </div>
    </Modal>
  );
}

export default SearchPost;
