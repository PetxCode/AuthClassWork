import { Button, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useContext, useState } from "react";
import { app } from "../base";
import { AuthContext } from "../WorkFile/Context/AuthManager";

const social = app.firestore().collection("post");
const AddPost = () => {
  const { current, newCurrent } = useContext(AuthContext);

  const [userPost, setUserPost] = useState([]);

  const [photoURL, setPhotoURL] = useState(null);
  const [location, setLocation] = useState("");

  const photoUpload = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setPhotoURL(await fileRef.getDownloadURL());
  };

  const [post, setPost] = useState("");

  const addPostMgs = async () => {
    const newPost = await app.auth().currentUser;

    if (addPostMgs) {
      await social.doc().set({
        post,
        photoURL,
        location,
        createdBy: newPost.uid,
        createdAt: new Date().toLocaleString(),
        dateTime: Date.now().toString(),
      });
    }
    setPost("");
    setPhotoURL("");
  };

  return (
    <div>
      <form
        style={{
          margin: "0 20px",
          display: "flex",
          flexDirection: "column",
          width: "300px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Input type="file" onChange={photoUpload} />
          <Input
            placeholder="Location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </div>
        <TextArea
          style={{
            marginBottom: "10px",
            marginTop: "10px",
            width: "300px",
            height: "100px",
          }}
          placeholder="What crime do you want to report"
          value={post}
          onChange={(e) => {
            setPost(e.target.value);
          }}
        />

        <Button
          onClick={() => {
            addPostMgs();
          }}
        >
          Report Now
        </Button>
      </form>
    </div>
  );
};

export default AddPost;
