/* eslint-disable @next/next/no-img-element */
"use client";
import "@/styles/postCrad/index.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const userImage =
  "https://firebasestorage.googleapis.com/v0/b/app-nextjs-1.appspot.com/o/profile_images%2Fphoto_2023-07-04%2009.52.12.jpeg?alt=media&token=43145a1d-a5ba-467f-a19b-7448553db3cf";
const imageUrl =
  "https://firebasestorage.googleapis.com/v0/b/app-nextjs-1.appspot.com/o/messages_images%2Fphoto_2023-07-04%2009.52.12.jpeg?alt=media&token=d22ac2c1-b77e-4782-88d5-4d415d553271";
function PostCrad() {
  return (
    <div className="post-card-main-div width-90 column gap-40px bg-w-c sh-x-s padding-30px b-r-20px">
      <div className="title-div a-i-c gap-10px">
        <p className="title-p t-d-l-u c-2">Your Posts</p>
      </div>
      <div className="masonry-component width-full height-full">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default PostCrad;

const Card = () => {
  return (
    <div className="post-card-div sh-x-s column j-c-c a-i-c b-r-20px gap-20px padding-t-20px padding-b-20px">
      <div className="header-div width-90 gap-10px j-c-s-b">
        <div className="gap-20px">
          <div className="user-image-div ">
            <img className="b-r-100px img" src={userImage} alt="" />
          </div>
          <div className="user-div column">
            <p className="username-p c-2">Muhammad Amin</p>
            <p className="job-p c-l">Developer</p>
          </div>
        </div>
        <div className="">
          <MoreVertIcon className="three-dot-icon" />
        </div>
      </div>

      <div className="img-div ">
        <img src={imageUrl} className="width-full height-full" alt="" />
      </div>

      <div className="message-div padding-10px">
        <p className="message-p">
          Hi, Im Muhammad Amin, a full-stack developer with over 2 years of
          experience in web development. My expertise lies in developing
          responsive web applications using React, Node.js, and MongoDB. I have
          worked on various projects ranging from e-commerce websites to social
          media platforms. My passion for coding and problem-solving has helped
          me deliver high-quality projects that meet client requirements. When
          Im not coding, you can find me hiking or playing video games. If youre
          interested in working with me, feel free to reach out via email at
          bimus2022@gmail.com.
        </p>
      </div>
    </div>
  );
};
