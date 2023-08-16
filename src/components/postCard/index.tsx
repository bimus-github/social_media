/* eslint-disable @next/next/no-img-element */
"use client";
import SendIcon from "@mui/icons-material/Send";
import AttachmentIcon from "@mui/icons-material/Attachment";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

import Picker from "emoji-picker-react";

import "@/styles/postCard/index.css";
import { useState } from "react";

function PostCard() {
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");

  return (
    <div className="post-card-main-div column bg-w-c width-90 bg-w-c sh-x-s padding-30px b-r-20px gap-20px">
      <div className="title-div gap-10px">
        <p className="title-p t-d-l-u c-2">Post Your Memories</p>
      </div>

      <div className="post-messages-div width-full j-c-c gap-20px column">
        <div className="textarea-div column b-r-10px padding-10px sh-x-s">
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
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    URL.createObjectURL(e.target.files![0]);
                    console.log(e.target.files![0]);
                  }}
                />
              </label>
            </div>
            <div className="icon-div padding-10px">
              <SendIcon className="send-icon icon height-30px width-30px" />
            </div>
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
      </div>
    </div>
  );
}

export default PostCard;
