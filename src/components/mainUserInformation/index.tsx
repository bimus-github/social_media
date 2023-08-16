/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import "@/styles/mainUserInformation/index.css";
import Button from "@/components/button";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import Input from "../input";

const profileImage =
  "https://s3-alpha-sig.figma.com/img/dacb/255d/022631d944ebe5dee4aa2a2c6c3e0a86?Expires=1692576000&Signature=i4hMAPOCBU1EeaocpROLze0SH7a92ISbX8tAyzyg514UANEgjuwM5cEreDR7XuJvZIVfkDDkgCJtZjWvmf3wrfrLGCQTeK9iycoS18xRS6R8JIXSIKWdvES2V~Vwa6FU83hnZ9pfByz2Y~coUhbZXukzPKjUDjmX4Z176njucF9Lp0HRsDsqXiyNT-HT-rd-vVWuWEwOdhyQQzBBThdU8lZ0uegOmLrrSm6drzX4BZucYFbdl~8Y9s9EQN3OQQ2vASn2hhfP2lQhbBzSsdQ8VhgI46BJOjQI3C0DR5GeaFqelN-gnsDh5LOvTV7h7ChS5co95~sr21RCREfEks0grQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4";

function MainUserInfromation() {
  const [openEditProfile, setOpenEditProfile] = useState<boolean>(false);
  const [firstName, setFistName] = useState<string>("");
  return (
    <div className="main-information-div width-90 bg-w-c sh-x-s padding-30px b-r-20px">
      <div className="title-div j-c-c a-i-c gap-10px">
        <p className="title-p t-d-l-u">User Profile</p>
        {!openEditProfile ? (
          <EditIcon
            onClick={() => setOpenEditProfile((p) => !p)}
            className="edit-title-icon"
          />
        ) : (
          <CloseIcon
            onClick={() => setOpenEditProfile((p) => !p)}
            className="edit-title-icon"
          />
        )}
      </div>

      <div className="information-div gap-20px">
        <div className="img-div column gap-10px j-c-c a-i-c">
          <img
            src={profileImage}
            alt="prfile image"
            className="img b-r-100px"
          />
          <div className="edit-btn-for-phones-div column gap-10px">
            <Button text="Upload New Photo " />
            <Button text="Delete " isBgWhite />
          </div>
        </div>

        <div className="informations column gap-10px j-c-c">
          <p className="name-p c-2 p-b">Alaa Muhammad</p>
          <p className="user-name-p c-l">@laamuhammad</p>
          <p className="job">Developer</p>
          <p className="location c-l">
            Eastern European Time (EET), Cairo UTC +3
          </p>
          <p className="about-p c-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>

        <div className="edit-btn-for-larg-devices gap-10px column a-i-c j-c-c">
          <Button text="Upload New Photo " />
          <Button text="Delete " isBgWhite />
        </div>
      </div>

      <div
        style={
          !openEditProfile
            ? {
                display: "none",
                visibility: "hidden",
              }
            : {
                display: "flex",
                visibility: "visible",
              }
        }
        className="edit-information-component-div column width-full gap-30px a-i-c j-c-c"
      >
        <div className="div-column-row gap-30px width-full a-i-c j-c-s-b">
          <Input
            title="First Name"
            type="text"
            value={firstName}
            setValue={setFistName}
            placeholder="eg: Muhammad Amin"
          />
          <Input
            title="Last Name"
            type="text"
            value={firstName}
            setValue={setFistName}
            placeholder="eg: Sherzod Aliy"
          />
        </div>

        <div className="div-column-row gap-30px width-full a-i-c j-c-s-b">
          <Input
            title="Profession"
            type="text"
            value={firstName}
            setValue={setFistName}
            placeholder="eg: Developer"
          />
          <Input
            title="Nickname"
            type="text"
            value={firstName}
            setValue={setFistName}
            placeholder="eg: muhammad@min"
          />
        </div>

        <div className="div-column-row gap-30px width-full a-i-c j-c-s-b">
          <div>
            <Input
              title="About"
              type="text"
              value={firstName}
              setValue={setFistName}
              placeholder="Brief infromation about yourself"
              isTextarea
            />
          </div>
          <div className="column gap-20px a-i-c j-c-s-b">
            <Input
              title="Location"
              type="text"
              value={firstName}
              setValue={setFistName}
              placeholder="eg: Tashkent, Uzbekistan"
            />
            <Button text="Save Changes " />
            <Button text="Clear " isBgWhite />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainUserInfromation;
