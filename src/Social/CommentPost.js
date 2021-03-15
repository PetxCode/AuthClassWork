import { Button, Input } from "antd";
import React, { useState, useEffect, useContext } from "react";
import { app } from "../base";
import { AuthContext } from "../WorkFile/Context/AuthManager";
import Display from "./Display";
import moment from "moment";
import ReadMore from "read-more-react";

const view = app.firestore().collection("authUser");
const commentPost = app.firestore().collection("post");
const CommentPost = ({ id }) => {
  const { current, newCurrent } = useContext(AuthContext);

  const [comment, setComment] = useState("");
  const [getPost, setGetPost] = useState([]);
  const [getUserData, setGetUserData] = useState([]);

  const commentOnPost = async () => {
    const newUser = await app.auth().currentUser;

    if (newUser) {
      await commentPost.doc(id).collection("comment").doc().set({
        postedBy: newUser.uid,
        commentedAt: new Date().toLocaleString(),
        dateTime: Date.now().toString(),
        comment,
      });
    }
    setComment("");
  };

  const getCommentMgs = async () => {
    await commentPost
      .doc(id)
      .collection("comment")
      .orderBy("dateTime", "desc")
      .onSnapshot((snapshot) => {
        const i = [];
        snapshot.forEach((doc) => {
          i.push({ ...doc.data(), id: doc.id });
        });
        setGetPost(i);
      });
  };

  useEffect(() => {
    getCommentMgs();
    // getData();
  }, []);
  return (
    <div>
      {" "}
      {getPost.length}
      <div
        style={{
          marginTop: "10px",
          display: "flex",
        }}
      >
        <Input
          placeholder="comments"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <Button onClick={commentOnPost}>comment</Button>
      </div>
      <br />
      <br />
      <div>
        {getPost.map(({ id, comment, commentedAt, postedBy }) => (
          <div
            key={id}
            style={{
              backgroundColor: "white",
              width: "80%",
            }}
          >
            <div>
              {" "}
              <Display postedBy={postedBy} />{" "}
            </div>
            <div>
              <ReadMore
                text={comment}
                min={10}
                ideal={10}
                max={10}
                readMoreText={"see more"}
              />
            </div>

            <h4>{moment(commentedAt).fromNow()} </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentPost;
