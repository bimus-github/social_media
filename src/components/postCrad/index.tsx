/* eslint-disable @next/next/no-img-element */
"use client";
import "@/styles/postCrad/index.css";
import { Message_Type } from "@/types";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const userImage =
  "https://firebasestorage.googleapis.com/v0/b/app-nextjs-1.appspot.com/o/profile_images%2Fphoto_2023-07-04%2009.52.12.jpeg?alt=media&token=43145a1d-a5ba-467f-a19b-7448553db3cf";

const imageUrl =
  "https://firebasestorage.googleapis.com/v0/b/app-nextjs-1.appspot.com/o/messages_images%2Fphoto_2023-07-04%2009.52.12.jpeg?alt=media&token=d22ac2c1-b77e-4782-88d5-4d415d553271";

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

const Card = ({ data }: CardProps) => {
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
        <img src={data.imageUrl} className="img" alt="" />
      </div>

      <div className="message-div padding-10px">
        <p className="message-p">{data.message}</p>
      </div>
    </div>
  );
};
