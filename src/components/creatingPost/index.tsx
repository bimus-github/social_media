/* eslint-disable @next/next/no-img-element */
"use client";
import "@/styles/creatingPost/index.css";
import { ChangeEvent, FormEvent, useState } from "react";

import AttachmentIcon from "@mui/icons-material/Attachment";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { Checkbox, CircularProgress, IconButton } from "@mui/material";

import Picker from "emoji-picker-react";

import { useAppDispatch, useAppSelector } from "@/strore/hooks";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { File_Type, Message_Type } from "@/types";
import { storage } from "@/firebase";
import { createMessage } from "@/firebase/message";
import { messagesByUserActions } from "@/strore/slices/messagesByUser";

function CreatingCard() {
  const currentUser = useAppSelector((state) => state.currentUser);
  const dispatch = useAppDispatch();
  const [typeOfFile, setTypeOfFile] = useState<File_Type>(File_Type.NONE);
  const [visibile, setVisibile] = useState<boolean>(true);
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onHandleSaveImage = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files;
    if (image) {
      if (image[0].type.match("image.*")) {
        setTypeOfFile(File_Type.IMAGE);
      } else {
        if (image[0].type.match("video.*")) {
          setTypeOfFile(File_Type.VIDEO);
        } else {
          return setTypeOfFile(File_Type.OTHER);
        }
      }

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

    const createdDate = new Date().toLocaleDateString("en-US");

    const newMessageData: Message_Type = {
      id: "",
      message,
      imageUrl,
      username: currentUser.username,
      firstname: currentUser.firstname,
      userImage: currentUser.imageUrl,
      userId: currentUser.id,
      job: currentUser.job,
      createdDate,
      updatedDate: "",
      likes: [],
      comments: [],
      typeOfFile,
      visibile: false,
    };

    createMessage(newMessageData)
      .then(({ data, e, ok }) => {
        // message created
        if (ok) {
          dispatch(messagesByUserActions.addMessage(data));
        }
      })
      .finally(() => {
        setLoading(false);
        setMessage("");
        setImageUrl("");
        setTypeOfFile(File_Type.NONE);
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
              <div className="icon-div padding-10px">
                <Checkbox
                  value={!visibile}
                  onChange={(e) => setVisibile(e.target.checked)}
                />
                <p className="check-box-p">Make a private</p>
              </div>
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
            <>
              {typeOfFile === File_Type.IMAGE && (
                <img
                  src={imageUrl}
                  alt=""
                  className="img height-full b-r-30px sh-x-s"
                />
              )}

              {typeOfFile === File_Type.VIDEO && (
                <video
                  src={imageUrl}
                  controls
                  autoPlay
                  className="img height-full width-full b-r-30px sh-x-s"
                />
              )}

              {typeOfFile === File_Type.OTHER && (
                <p>You can choose only images or videos!</p>
              )}
            </>
          )}
          {imageUrl.length !== 0 && (
            <IconButton
              style={{
                position: "absolute",
                right: "0",
                top: "0",
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
