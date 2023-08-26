/* eslint-disable @next/next/no-img-element */
"use client";
import { FormEvent, useEffect, useState } from "react";
import "@/styles/mainUserInformation/index.css";
import { User_Type } from "@/types";

import { CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

import { storage } from "@/firebase";
import { currentUserActions } from "@/strore/slices/currentUser";
import { useAppDispatch, useAppSelector } from "@/strore/hooks";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { updateUser } from "@/firebase/user";
import Button from "@/components/button";
import Input from "@/components/input";

const profileImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-4TTdIlL3swAddqR7ZY42BAgAo5Xj4lawocuvnjIuEVXm7ref0Xb9D0LTqfCNyPVGpy8&usqp=CAU";

interface Props {
  currentUser: User_Type;
}
function MainUserInfromation({ currentUser }: Props) {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [openEditProfile, setOpenEditProfile] = useState<boolean>(false);

  const [firstname, setFirstname] = useState<string>(currentUser.firstname);
  const [lastname, setLastname] = useState<string>(currentUser.lastname);
  const [username, setUsername] = useState<string>(currentUser.username);
  const [location, setLocation] = useState<string>(currentUser.location);
  const [job, setJob] = useState<string>(currentUser.job);
  const [about, setAbout] = useState<string>(currentUser.about);
  const [imageUrl, setImageUrl] = useState<string>(currentUser.imageUrl);

  useEffect(() => {
    setLoading(true);
    setImageUploadPercentage(true);
    if (username.length === 0) {
      setUsername(currentUser.username);
      setAbout(currentUser.about);
      setLastname(currentUser.lastname);
      setJob(currentUser.job);
      setLocation(currentUser.location);
    }
    setImageUploadPercentage(false);
    setLoading(false);
  }, [currentUser, username]);

  const [imageUplaodPercentage, setImageUploadPercentage] =
    useState<boolean>(false);

  const uploadImage = (files: FileList) => {
    const image = files[0];

    const storageRef = ref(storage, `profile_images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        if (percent === 0) setImageUploadPercentage(true);

        if (percent === 100) setImageUploadPercentage(false);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          await updateUser({
            ...currentUser,
            imageUrl: url,
          });

          setImageUrl(url);

          dispatch(
            currentUserActions.setUser({ ...currentUser, imageUrl: url })
          );
        });
      }
    );
  };

  const handleDeleteUserImage = () => {
    alert("Are you sure?");
    updateUser({ ...currentUser, imageUrl: "" })
      .then(() => {
        setImageUploadPercentage(true);
      })
      .finally(() => {
        setImageUploadPercentage(false);
        dispatch(currentUserActions.setUser({ ...currentUser, imageUrl: "" }));
      });
  };

  const onUpdateUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser: User_Type = {
      id: currentUser.id,
      about,
      firstname,
      imageUrl,
      job,
      lastname,
      location,
      username,
    };

    updateUser(newUser)
      .then(() => {
        setLoading(true);
        dispatch(currentUserActions.setUser(newUser));
      })
      .finally(() => {
        setOpenEditProfile(false);
        setLoading(false);
      });
  };

  return (
    <div className="main-information-div width-90 bg-w-c sh-x-s padding-30px b-r-20px">
      <div className="title-div a-i-c gap-10px">
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

      <div className="information-div gap-20px j-c-s-b">
        <div className="information-div gap-20px ">
          <div className="img-btns-div column gap-10px j-c-c a-i-c">
            {!imageUplaodPercentage ? (
              <div className="img-div b-r-100px a-i-c j-c-c">
                <img
                  src={
                    currentUser.imageUrl.length !== 0
                      ? currentUser.imageUrl
                      : profileImage
                  }
                  alt="prfile image"
                  className="img height-full"
                />
              </div>
            ) : (
              <div className="img b-r-100px j-c-c a-i-c ">
                <CircularProgress color="success" />
              </div>
            )}
            <div className="edit-btn-for-phones-div column gap-10px">
              <Button
                text="Upload New Photo "
                isUploadImageBtn
                setImage={(v) => uploadImage(v)}
                loading={imageUplaodPercentage}
              />
              <Button
                text="Delete "
                isBgWhite
                onClick={handleDeleteUserImage}
              />
            </div>
          </div>

          <div className="informations column gap-10px j-c-c">
            <p className="name-p c-2 p-b">
              {currentUser.firstname.length === 0 ? (
                <p style={{ color: "red" }}>Please create your firstname!</p>
              ) : (
                firstname
              )}{" "}
              {lastname}
            </p>
            <p className="user-name-p c-l">
              {currentUser.username.length === 0 ? (
                <p style={{ color: "red" }}>Please create your username!</p>
              ) : (
                username
              )}
            </p>
            <p className="job">
              {job.length === 0 ? (
                <p style={{ color: "red" }}>Please create your job!</p>
              ) : (
                job
              )}
            </p>
            <p className="location c-l">
              {currentUser.location.length === 0 ? (
                <p style={{ color: "red" }}>Please create your location!</p>
              ) : (
                location
              )}
            </p>
            <p className="about-p c-2">
              {currentUser.about.length === 0 ? (
                <p style={{ color: "red" }}>
                  Please create some infromation about yourself!
                </p>
              ) : (
                about
              )}
            </p>
          </div>
        </div>

        <div className="edit-btn-for-larg-devices gap-10px column a-i-c j-c-c">
          <Button
            text="Upload New Photo "
            isUploadImageBtn
            setImage={(v) => uploadImage(v)}
            loading={imageUplaodPercentage}
          />
          <Button text="Delete " isBgWhite onClick={handleDeleteUserImage} />
        </div>
      </div>

      <form
        onSubmit={onUpdateUser}
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
            value={firstname}
            setValue={setFirstname}
            placeholder="eg: Muhammad Amin"
          />
          <Input
            title="Last Name"
            type="text"
            value={lastname}
            setValue={setLastname}
            placeholder="eg: Sherzod Aliy"
          />
        </div>

        <div className="div-column-row gap-30px width-full a-i-c j-c-s-b">
          <Input
            title="Profession"
            type="text"
            value={job}
            setValue={setJob}
            placeholder="eg: Developer"
          />
          <Input
            title="Nickname"
            type="text"
            value={username}
            setValue={setUsername}
            placeholder="eg: muhammad@min"
          />
        </div>

        <div className="div-column-row gap-30px width-full a-i-c j-c-s-b">
          <div>
            <Input
              title="About"
              type="text"
              value={about}
              setValue={setAbout}
              placeholder="Brief infromation about yourself"
              isTextarea
            />
          </div>
          <div className="column gap-20px a-i-c j-c-s-b">
            <Input
              title="Location"
              type="text"
              value={location}
              setValue={setLocation}
              placeholder="eg: Tashkent, Uzbekistan"
            />
            <Button text="Save Changes " loading={loading} />
            <Button text="Clear " isBgWhite />
          </div>
        </div>
      </form>
    </div>
  );
}

export default MainUserInfromation;
