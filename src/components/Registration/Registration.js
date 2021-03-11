import { Button, Input } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { app } from "../../base";
import UploadImage from "./UploadImage";

const store = app.storage();
const newUser = app.firestore().collection("users");
const Registration = () => {
  const hist = useHistory();
  const [toggle, setToggle] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [name1, setName1] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [profile, setProfile] = useState("");
  const [picture, setPicture] = useState(null);

  const HandleToggle = () => {
    setToggle(!toggle);
  };

  const UploadPix = async (e) => {
    const file = e.target.files[0];
    const storageRef = store.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setPicture(await fileRef.getDownloadURL());
  };

  const SignUpUser = async () => {
    const bestUser = await app
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await newUser.doc(bestUser.user.uid).set({
      name1,
      password,
      email,
      profile,
      avatar: await picture,
    });

    hist.push("/");
  };

  const SignInUser = async () => {
    await app.auth().signInWithEmailAndPassword(email, password);
    hist.push("/");
  };

  return (
    <div>
      <div></div>
      <center>
        <br />
        <br />

        <br />
        <div>
          <Link
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              color: "black",
            }}
            to="/"
          >
            Logo
          </Link>
        </div>
      </center>
      {toggle ? (
        <center>
          <br />
          <br />
          <br />
          <br />
          <UploadImage
            style={{
              width: "300px",
              paddingLeft: "10px",
            }}
          />
          <Input
            style={{
              width: "300px",
              paddingLeft: "10px",
            }}
            onClick={UploadPix}
            type="file"
            placeholder="PhotoFile"
            value={photoFile}
            onChange={(e) => {
              setPhotoFile(e.target.value);
            }}
          />
          <br />
          <br />
          <input
            style={{
              width: "300px",
              paddingLeft: "10px",
            }}
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <br />
          <input
            style={{
              width: "300px",
              paddingLeft: "10px",
            }}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <input
            style={{
              width: "300px",
              paddingLeft: "10px",
            }}
            placeholder="Name"
            value={name1}
            onChange={(e) => {
              setName1(e.target.value);
            }}
          />
          <br />
          <br />

          <input
            style={{
              width: "300px",
              paddingLeft: "10px",
            }}
            placeholder="Profile"
            value={profile}
            onChange={(e) => {
              setProfile(e.target.value);
            }}
          />
          <br />
          <br />
          <Button
            onClick={() => {
              SignUpUser();
            }}
          >
            Sign Up
          </Button>
          <br />
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div>Already have an Account</div>
            <div
              style={{
                marginLeft: "5px",
                color: "red",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={HandleToggle}
            >
              Sign In here
            </div>
          </div>
        </center>
      ) : (
        <center>
          <br />
          <br />
          <br />
          <br />

          <br />
          <br />
          <input
            style={{
              width: "300px",
              paddingLeft: "10px",
            }}
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <br />
          <input
            style={{
              width: "300px",
              paddingLeft: "10px",
            }}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <br />
          <br />
          <Button
            onClick={() => {
              SignInUser();
            }}
          >
            Sign In
          </Button>
          <br />
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div>Don't have an Account</div>
            <div
              style={{
                marginLeft: "5px",
                color: "blue",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={HandleToggle}
            >
              Sign Up here
            </div>
          </div>
        </center>
      )}
    </div>
  );
};

export default Registration;
