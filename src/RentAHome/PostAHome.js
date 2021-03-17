import { Button, Input } from "antd";
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { app } from "../base";
import HeaderFile from "../WorkFile/HomeDesign/HeaderFile";

const home = app.firestore().collection("rent");

const PostAHome = () => {
  const hist = useHistory();
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");
  const [cost, setCost] = useState("");
  const [fullAddress, setFullAddres] = useState("");

  const [free, setFree] = useState(false);

  const [coverImage, setCoverImage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/codelab-f5579.appspot.com/o/10%20(FILEminimizer).jpg?alt=media&token=2a47085d-d594-43a0-9abf-52cb2dad4b81"
  );
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [vid1, setVid1] = useState(null);
  const [vid2, setVid2] = useState(null);
  const [vid3, setVid3] = useState(null);
  const [vid4, setVid4] = useState(null);

  const coverImageHandle = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setCoverImage(await fileRef.getDownloadURL());
  };

  const firstImage = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setImage1(await fileRef.getDownloadURL());
  };

  const secondImage = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setImage2(await fileRef.getDownloadURL());
  };

  const thirdImage = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setImage3(await fileRef.getDownloadURL());
  };

  const fouthImage = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setImage4(await fileRef.getDownloadURL());
  };

  const firstVid = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setVid1(await fileRef.getDownloadURL());
  };

  const secondVid = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setVid2(await fileRef.getDownloadURL());
  };

  const thirdVid = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setVid3(await fileRef.getDownloadURL());
  };

  const fouthVid = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setVid4(await fileRef.getDownloadURL());
  };

  const postToBackEnd = async () => {
    const newUser = await app.auth().currentUser;

    if (newUser) {
      await home.doc().set({
        location,
        fullAddress,
        coverImage,
        cost,
        image1,
        image2,
        image3,
        image4,
        vid1,
        vid2,
        vid3,
        vid4,
        desc,
        free,
        createdBy: newUser.uid,
        postAt: new Date().toLocaleString(),
        dateTime: Date.now().toString(),
      });
    }

    setCoverImage("");
    setImage1("");
    setImage2("");
    setImage3("");
    setImage4("");
    setVid1("");
    setVid2("");
    setVid3("");
    setVid4("");
    setLocation("");
    setFullAddres("");
    setCost("");
    setDesc("");
    // window.location.reload(true);
    hist.push("/rent");
  };

  return (
    <div>
      <HeaderFile />
      <br />
      <br />
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "500px",
          marginLeft: "30px",
        }}
      >
        <br />
        <div>
          <label>Cover Picture</label>

          <Input
            placeholder="Cover Image"
            type="file"
            onChange={coverImageHandle}
          />
        </div>
        <br />
        <div>
          <label>Image 1</label>

          <Input placeholder="Image1" type="file" onChange={firstVid} />
        </div>
        <br />

        <div>
          <label>Image 2</label>

          <Input placeholder="Image2" type="file" onChange={secondVid} />
        </div>
        <br />

        <div>
          <label>Image 3</label>
          <Input placeholder="Image3" type="file" onChange={thirdVid} />
        </div>

        <br />

        <div>
          <label>Image 4</label>
          <Input placeholder="Image4" type="file" onChange={fouthVid} />
        </div>
        <br />
        <br />
        <div>
          <div>
            <label>Video 1</label>

            <Input placeholder="Video 1" type="file" onChange={firstImage} />
          </div>
          <br />

          <div>
            <label>Video 2</label>

            <Input placeholder="Video 2" type="file" onChange={secondImage} />
          </div>
          <br />

          <div>
            <label>Video 3</label>
            <Input placeholder="Video 3" type="file" onChange={thirdImage} />
          </div>

          <br />

          <div>
            <label>Video 4</label>
            <Input placeholder="Video 4" type="file" onChange={fouthImage} />
          </div>
          <br />

          <br />
          <br />
          <div>
            <label> Location</label>
            <Input
              placeholder="Location"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />

            <br />
          </div>
          <br />
          <div>
            <label> Full Address</label>
            <Input
              placeholder="Full Address"
              value={fullAddress}
              onChange={(e) => {
                setFullAddres(e.target.value);
              }}
            />
            <br />
          </div>

          <br />
          <div>
            <label> Desc</label>
            <Input
              placeholder="Desc"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </div>

          <br />

          <div>
            <label> Cost</label>
            <Input
              type="number"
              placeholder="Cost"
              value={cost}
              onChange={(e) => {
                setCost(e.target.value);
              }}
            />
          </div>

          <br />
          <br />

          <Button
            style={{
              width: "100%",
              textTransform: "uppercase",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "50px",
            }}
            type="primary"
            danger
            onClick={postToBackEnd}
          >
            Post it
          </Button>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default PostAHome;
