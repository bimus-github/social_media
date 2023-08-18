/* eslint-disable @next/next/no-img-element */
"use client";
import "@/styles/creatingPost/index.css";
import { ChangeEvent, FormEvent, useState } from "react";

import AttachmentIcon from "@mui/icons-material/Attachment";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { CircularProgress, IconButton } from "@mui/material";

import Picker from "emoji-picker-react";

import { useAppSelector } from "@/strore/hooks";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Message_Type } from "@/types";
import { storage } from "@/firebase";
import { createMessage } from "@/firebase/message";

function CreatingCard() {
  const currentUser = useAppSelector((state) => state.currentUser);
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onHandleSaveImage = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files;
    if (image) {
      const storageRef = ref(storage, `messages_images/${image[0].name}`);
      const uploadTask = uploadBytesResumable(storageRef, image[0]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          if (percent === 0) setLoading(true);

          if (percent === 100) setLoading(false);
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            setImageUrl(url);
          });
        }
      );
    }
  };

  const handleDeleteImage = () => {
    setImageUrl("");
  };

  const handleSaveMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newMessageData: Message_Type = {
      id: currentUser.id,
      message,
      imageUrl,
      username: currentUser.username,
      firstname: currentUser.firstname,
      userImage: currentUser.imageUrl,
    };

    createMessage(newMessageData)
      .then(() => {
        // message created
      })
      .finally(() => {
        setLoading(false);
        setMessage("");
        setImageUrl("");
      });
  };

  return (
    <div className="creating-card-main-div column bg-w-c width-90 bg-w-c sh-x-s padding-30px b-r-20px gap-20px">
      <div className="title-div gap-10px">
        <p className="title-p t-d-l-u c-2">Post Your Memories</p>
      </div>

      <form
        onSubmit={handleSaveMessage}
        className="creating-messages-div width-full j-c-c gap-20px row"
      >
        <div className="textarea-div width-60 column b-r-10px padding-10px sh-x-s">
          <textarea
            name=""
            id=""
            cols={30}
            rows={20}
            className="textarea padding-10px"
            placeholder="eg: I saw a very beautiful butterfly last morning ❤️."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></textarea>
          <div
            style={{ position: "relative" }}
            className="post-btns-div j-c-s-b"
          >
            <div>
              <div className="icon-div padding-10px">
                <EmojiEmotionsIcon
                  onClick={() => setOpenEmoji((p) => !p)}
                  className="emoji-icon icon"
                />
              </div>
              <label className="icon-div padding-10px">
                <AttachmentIcon className="file-icon icon" />
                <input type="file" hidden onChange={onHandleSaveImage} />
              </label>
            </div>
            <IconButton
              style={
                message.length === 0 || imageUrl.length === 0
                  ? {
                      display: "none",
                      visibility: "hidden",
                    }
                  : {
                      display: "flex",
                      visibility: "visible",
                    }
              }
              className="icon-div padding-10px"
              type="submit"
            >
              <SendIcon className="send-icon icon height-30px width-30px" />
            </IconButton>
            <div
              style={
                openEmoji
                  ? {
                      position: "absolute",
                      top: "-400px",
                      left: "50px",
                    }
                  : {
                      display: "none",
                      visibility: "visible",
                    }
              }
            >
              <Picker
                autoFocusSearch={true}
                onEmojiClick={({ emoji }) => setMessage((p) => p + emoji)}
              />
            </div>
          </div>
        </div>
        <div className="image-view-card-div width-40 j-c-c a-i-c">
          {loading ? (
            <CircularProgress color="success" />
          ) : (
            <img src={imageUrl} alt="" className="width-full b-r-30px sh-x-s" />
          )}
          {imageUrl.length !== 0 && (
            <IconButton
              style={{
                position: "absolute",
                left: "0",
                bottom: "0",
              }}
              onClick={handleDeleteImage}
            >
              <DeleteIcon fontSize="large" color="error" />
            </IconButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default CreatingCard;
