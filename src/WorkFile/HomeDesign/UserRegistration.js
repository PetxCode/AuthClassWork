import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { app } from "../../base";

const userCase = app.firestore().collection("authUser");

const UserRegistration = () => {
  const hist = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState("");
  const [picture, setPicture] = useState(null);

  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const pushImage = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setPicture(await fileRef.getDownloadURL());
  };

  const SignUpUser = async () => {
    const newUser = await app
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await userCase.doc(newUser.user.uid).set({
      name,
      email,
      password,
      profile,
      avatar: await picture,
    });
    hist.push("/");
  };

  const SignInUser = async () => {
    await app.auth().signInWithEmailAndPassword(email, password);
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <center>
        <h2
          style={{
            cursor: "pointer",
          }}
        >
          <Link
            to="/"
            style={{
              color: "black",
            }}
          >
            {" "}
            Go Back Home
          </Link>
        </h2>
      </center>
      <center>
        {toggle ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "300px",
            }}
          >
            <Input
              style={{
                width: "100%",
                marginBottom: "20px",
              }}
              type="file"
              placeholder="Pix"
              onChange={pushImage}
            />
            <Input
              style={{
                width: "100%",
                marginBottom: "20px",
              }}
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              style={{
                width: "100%",
                marginBottom: "20px",
              }}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Input
              style={{
                width: "100%",
                marginBottom: "20px",
              }}
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Input
              style={{
                width: "100%",
                marginBottom: "10px",
              }}
              placeholder="Profile"
              value={profile}
              onChange={(e) => {
                setProfile(e.target.value);
              }}
            />
            <Button
              style={{
                width: "100%",
                marginBottom: "10px",
              }}
              type="primary"
              onClick={SignUpUser}
            >
              Sign Up
            </Button>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <div>Already have an Account, </div>
              <div
                style={{
                  marginLeft: "5px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  color: "red",
                }}
                onClick={handleToggle}
              >
                Sign In Here
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "300px",
            }}
          >
            <br />
            <br />
            <br />
            <br />

            <br />
            <Input
              style={{
                width: "100%",
                marginBottom: "20px",
              }}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Input
              style={{
                width: "100%",
                marginBottom: "20px",
              }}
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <Button
              style={{
                width: "100%",
                marginBottom: "10px",
              }}
              type="primary"
              onClick={SignInUser}
            >
              Sign In
            </Button>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <div>Don't have an Account, </div>
              <div
                style={{
                  marginLeft: "5px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  color: "blue",
                }}
                onClick={handleToggle}
              >
                Sign Up Here
              </div>
            </div>
          </div>
        )}
      </center>
    </div>
  );
};

export default UserRegistration;
