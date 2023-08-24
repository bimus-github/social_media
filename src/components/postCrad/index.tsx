/* eslint-disable @next/next/no-img-element */
"use client";
import "@/styles/postCrad/index.css";
import { Comment_Type, Message_Type } from "@/types";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyIcon from "@mui/icons-material/Reply";
import { IconButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/strore/hooks";
import { useState } from "react";
import { messagesActions } from "@/strore/slices/messages";
import { updateMessageById } from "@/firebase/message";
interface Props {
  title: string;
  data: Message_Type[];
}

const userImage =
  "https://firebasestorage.googleapis.com/v0/b/app-nextjs-1.appspot.com/o/profile_images%2Fphoto_2023-07-04%2009.52.12.jpeg?alt=media&token=43145a1d-a5ba-467f-a19b-7448553db3cf";
function PostCrad({ title, data }: Props) {
  return (
    <div className="post-card-main-div width-90 column gap-40px bg-w-c sh-x-s padding-30px b-r-20px">
      <div className="title-div a-i-c gap-10px">
        <p className="title-p t-d-l-u c-2">{title}</p>
      </div>
      <div className="masonry-component width-full height-full ">
        {data.length !== 0 &&
          data.map((message, i) => <Card data={message} key={i} />)}
      </div>
    </div>
  );
}

export default PostCrad;

interface CardProps {
  data: Message_Type;
}

interface colorOfLikeIconProps {
  likes: string[];
  currentUserId: string;
}

const colorOfLikeIcon = (props: colorOfLikeIconProps) => {
  const { currentUserId, likes } = props;

  const liked = likes.find((like) => like === currentUserId);
  if (liked?.length) {
    return true;
  }

  return false;
};

const Card = ({ data }: CardProps) => {
  const [likes, setLikes] = useState<string[]>(data.likes);
  const currentUser = useAppSelector((state) => state.currentUser);
  const [comment, setComment] = useState("");
  const dispatch = useAppDispatch();

  const liked = colorOfLikeIcon({
    likes: likes,
    currentUserId: currentUser.id,
  });

  const onClickLike = async () => {
    if (liked) {
      setLikes(likes.filter((id) => id !== currentUser.id));

      const newMessage = {
        ...data,
        likes: likes.filter((id) => id !== currentUser.id),
      };
      dispatch(messagesActions.updateMessage(newMessage));
      await updateMessageById(newMessage);
    } else {
      setLikes([...likes, currentUser.id]);

      const newMessage = { ...data, likes: [...likes, currentUser.id] };
      dispatch(messagesActions.updateMessage(newMessage));
      await updateMessageById(newMessage);
    }
  };

  const onClickComment = () => {
    const newComment: Comment_Type = {
      comment,
      userId: currentUser.id,
      userImage: currentUser.imageUrl,
      username: currentUser.username,
    };

    const comments: Comment_Type[] = [...data.comments, newComment];

    dispatch(messagesActions.updateMessage({ ...data, comments }));

    updateMessageById({ ...data, comments });

    setComment("");
  };

  return (
    <div className="post-card-div sh-x-s column b-r-20px gap-20px padding-t-20px padding-b-20px">
      <div className="header-div width-90 gap-10px j-c-s-b padding-10px">
        <div className="gap-20px">
          <div className="user-image-div ">
            <img className="b-r-100px img" src={data.userImage} alt="" />
          </div>
          <div className="user-div column">
            <p className="username-p c-2">{data.firstname}</p>
            <p className="job-p c-l">{data.job}</p>
          </div>
        </div>
        <div className="">
          <MoreVertIcon className="three-dot-icon" />
        </div>
      </div>

      <div className="img-div j-c-c a-i-c ">
        <div className="like-div a-i-c">
          <IconButton className="like-btn" onClick={onClickLike}>
            <FavoriteIcon color={liked ? "error" : "inherit"} />
          </IconButton>
          <p>{likes.length}</p>
        </div>
        <img src={data.imageUrl} className="img" alt="" />
        <div className="created-date-div">
          <p>{data.createdDate}</p>
        </div>
      </div>

      <div className="message-div padding-10px">
        <p className="message-p">{data.message}</p>
      </div>

      <div className="bottom-btns-div j-c-s-b padding-l-10px a-i-c j-c-c padding-r-10px a-i-c">
        <div className="comment-div b-r-5px gap-5px sh-x-s width-80 height-40px">
          <input
            className="input width-full"
            value={comment}
            type="text"
            onChange={(e) => setComment(e.target.value)}
            placeholder="eg: The best memory ... ."
          />
          <IconButton
            onClick={onClickComment}
            style={
              comment.length === 0
                ? {
                    display: "none",
                    visibility: "hidden",
                  }
                : {
                    display: "flex",
                    visibility: "visible",
                  }
            }
          >
            <ReplyIcon fontSize="small" color="primary" />
          </IconButton>
        </div>
      </div>

      <div className="width-full a-i-c j-c-c">
        <div className="horizontal-line-div height-1px bg-pr-c width-95" />
      </div>

      <div className="width-full a-i-c j-c-c ">
        <div className="comments-div b-r-10px sh-x-s gap-5px column bg-l-g-c width-90 padding-10px">
          <div className="title-comments-div a-i-c gap-10px">
            <p className="title-p font-s-25px">Comments</p>
            <p className="length p-b c-2">{data.comments.length}</p>
          </div>

          {data.comments.length !== 0 ? (
            <div className="first-comment-div a-i-c gap-10px">
              <div className="img-div-user b-r-100px">
                <img src={data.comments[0].userImage} className="img" alt="" />
              </div>
              <div className="comment-div">
                <p className="comment-p">{data.comments[0].comment} </p>
              </div>
            </div>
          ) : (
            <div className="first-comment-div a-i-c gap-10px">
              There is no comments, yet!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
