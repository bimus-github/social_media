"use client";

import MainUserInfromation from "@/components/mainUserInformation";
import CreatingCard from "@/components/creatingPost";
import PostCrad from "@/components/postCrad";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/strore/hooks";
import { getMessagesByUser } from "@/firebase/message";
import { messagesByUserActions } from "@/strore/slices/messagesByUser";

function Me() {
  const dispatch = useAppDispatch();
  const messagesByUser = useAppSelector((state) => state.messageByUser);
  const currentUser = useAppSelector((state) => state.currentUser);

  useEffect(() => {
    getMessagesByUser(currentUser.id).then(({ data, e, ok }) => {
      if (ok) {
        dispatch(messagesByUserActions.setMessages(data));
      }
    });
  }, [currentUser.id, dispatch]);

  return (
    <div className="me-main-div width-full column a-i-c padding-20px gap-40px">
      <MainUserInfromation />
      <CreatingCard />
      <PostCrad title="Your Posts" data={messagesByUser} />
    </div>
  );
}

export default Me;
