/* eslint-disable @next/next/no-img-element */
"use client";

import Modal from "@/components/modalForCard";
import { useAppDispatch, useAppSelector } from "@/strore/hooks";
import { Comment_Type, File_Type, Message_Type } from "@/types";
import React, { useEffect, useState } from "react";
import "@/styles/postModalPage/index.css";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyIcon from "@mui/icons-material/Reply";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import { messagesActions } from "@/strore/slices/messages";
import { updateMessageById } from "@/firebase/message";
import Link from "next/link";
import { colorOfLikeIcon } from "@/utils/colorOfLikeIcon";

function CurrentPost({ params }: { params: { id: string } }) {
  const messages = useAppSelector((state) => state.messages);
  const currentUser = useAppSelector((state) => state.currentUser);
  const dispatch = useAppDispatch();
  const [post, setPost] = useState<Message_Type>();
  const [likes, setLikes] = useState<string[]>([]);
  const [comment, setComment] = useState<string>("");

  const onClickComment = () => {
    const newComment: Comment_Type = {
      comment,
      userId: currentUser.id,
      userImage: currentUser.imageUrl,
      username: currentUser.username,
    };

    if (post) {
      const comments: Comment_Type[] = [...post.comments, newComment];

      dispatch(messagesActions.updateMessage({ ...post, comments }));

      updateMessageById({ ...post, comments });

      setComment("");
    }
  };

  const liked = colorOfLikeIcon({
    likes: likes,
    currentUserId: currentUser.id,
  });

  const onClickLike = async () => {
    if (post) {
      if (liked) {
        setLikes(likes.filter((id) => id !== currentUser.id));

        const newMessage = {
          ...post,
          likes: likes.filter((id) => id !== currentUser.id),
        };
        dispatch(messagesActions.updateMessage(newMessage));
        await updateMessageById(newMessage);
      } else {
        setLikes([...likes, currentUser.id]);

        const newMessage = { ...post, likes: [...likes, currentUser.id] };
        dispatch(messagesActions.updateMessage(newMessage));
        await updateMessageById(newMessage);
      }
    }
  };

  const makeUnvisibile = () => {
    if (post) {
      updateMessageById({ ...post, visibile: false }).then(() => {
        dispatch(messagesActions.updateMessage({ ...post, visibile: false }));
      });
    }
  };

  const makeVisibile = () => {
    if (post) {
      updateMessageById({ ...post, visibile: true }).then(() => {
        dispatch(messagesActions.updateMessage({ ...post, visibile: true }));
      });
    }
  };

  useEffect(() => {
    const currentMessage = messages.filter(
      (message) => message.id === params.id
    )[0];
    setPost(currentMessage);
    if (post) {
      setLikes(post?.likes);
    }
  }, [messages, params.id, post]);

  return (
    <Modal>
      <div className="width-full height-full row">
        <div className="left-div width-40  a-i-c j-c-c">
          <div className="file-div width-90 height-600px">
            {post?.typeOfFile === File_Type.IMAGE && (
              <img
                src={post.imageUrl}
                alt=""
                className="width-full sh-x-s b-r-10px"
              />
            )}
            {post?.typeOfFile === File_Type.VIDEO && (
              <video
                src={post.imageUrl}
                controls
                autoPlay
                className="width-full sh-x-s b-r-10px"
              />
            )}
          </div>
        </div>

        <div className="right-div width-60 column gap-20px">
          <div className="header-div j-c-s-b padding-5px width-full">
            <div className=" gap-10px">
              <div className="user-img-div width-60px height-60px b-r-100px j-c-c a-i-c">
                <img src={post?.userImage} className="height-full img" alt="" />
              </div>
              <div className="name-job-div column j-c-c ">
                <p className="name-p font-s-25px">{post?.firstname}</p>
                <p className="job-p font-s-20px">{post?.job}</p>
              </div>
            </div>

            <div className="option-btns">
              <IconButton
                onClick={onClickLike}
                className="like-btn width-60px gap-5px"
              >
                <p className="like-count c-2">{likes.length}</p>
                <FavoriteIcon color={liked ? "error" : "inherit"} />
              </IconButton>
              {currentUser.id === post?.userId && (
                <IconButton className="edit-btn width-60px">
                  <EditIcon color="primary" />
                </IconButton>
              )}
              {currentUser.id === post?.userId && (
                <IconButton className="delete-btn width-60px">
                  <DeleteIcon color="primary" />
                </IconButton>
              )}
              {currentUser.id === post?.userId &&
                (post.visibile ? (
                  <IconButton
                    className="visibile-icon width-60px"
                    onClick={makeUnvisibile}
                  >
                    <VisibilityIcon color="primary" />
                  </IconButton>
                ) : (
                  <IconButton
                    className="unvisibile-icon width-60px"
                    onClick={makeVisibile}
                  >
                    <VisibilityOffIcon color="primary" />
                  </IconButton>
                ))}
              <IconButton className="share-icon width-60px">
                <ShareIcon color="primary" />
              </IconButton>
            </div>
          </div>

          <div className="main-content-div width-95 column gap-20px padding-l-10px">
            <div className="message-div">
              <p>{post?.message}</p>
            </div>

            <div className="comment-input-div width-full j-c-c column gap-10px">
              <div className="comment-input-title">
                <p className="comment-title-p font-s-20px c-2">
                  Give feedback on this
                </p>
              </div>

              <div className="input-div b-r-5px gap-5px sh-x-s width-80 height-40px ">
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

            <div className="width-full height-1px bg-pr-c sh-x-s" />

            <div className="comments-div bg-l-g-c b-r-10px margin-10px padding-10px column gap-20px">
              <div className="title-p font-s-25px c-2">Comments</div>
              <div className="comments column gap-20px a-i-c padding-10px">
                {post?.comments.map((comment, index) => (
                  <div
                    className="comment-div width-90 gap-10px bg-w b-r-10px padding-10px sh-x-s margin-5px"
                    key={index}
                  >
                    <div className="user-img-div width-50px height-50px b-r-100px">
                      <img
                        src={comment.userImage}
                        alt=""
                        className="width-full"
                      />
                    </div>
                    <div className="comment-msg-div column gap-5px">
                      <Link
                        href={`users/user/${comment.userId}`}
                        className="username-div"
                      >
                        {comment.username}
                      </Link>
                      <p className="message-p">{comment.comment}</p>
                    </div>
                  </div>
                ))}

                {post?.comments.length === 0 && (
                  <p>There is no comments yet!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CurrentPost;
