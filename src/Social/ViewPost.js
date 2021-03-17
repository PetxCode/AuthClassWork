import React, { useState, useEffect, useContext } from "react";
import { app } from "../base";
import { AuthContext } from "../WorkFile/Context/AuthManager";
import AddImage from "./AddImage";
import moment from "moment";
import CommentPost from "./CommentPost";
import { Input } from "antd";
import ShowAgeinImage from "../RentAHome/ShowAgeinImage";

const view = app.firestore().collection("post");
const commentPost = app.firestore().collection("post");

const ViewPost = () => {
  const { current, newCurrent } = useContext(AuthContext);
  const [viewPost, setViewPost] = useState([]);
  const [getUserData, setGetUserData] = useState([]);
  const [getPost, setGetPost] = useState([]);

  const ViewAllPost = async () => {
    const newUser = await app.auth().currentUser;
    if (newUser) {
      await view.orderBy("createdAt", "asc").onSnapshot((snapshot) => {
        const i = [];
        snapshot.forEach((doc) => {
          i.push({ ...doc.data(), id: doc.id });
        });
        setViewPost(i);
        console.log(viewPost);
      });
    }
  };

  const getCommentMgs = async (id) => {
    await commentPost
      .doc(id)
      .collection("comment")
      .orderBy("dateTime", "asc")
      .onSnapshot((snapshot) => {
        const i = [];
        snapshot.forEach((doc) => {
          i.push({ ...doc.data(), id: doc.id });
        });
        setGetPost(i);
      });
  };

  useEffect(() => {
    ViewAllPost();
  }, []);

  return (
    <div>
      List of Post now
      <div
        style={
          {
            // width: "400px",
            // backgroundColor: "lightcoral",
          }
        }
      >
        {viewPost.map(
          ({ id, post, createdBy, createdAt, photoURL, location }) => (
            <div
              key={id}
              style={{
                width: "50%",
                backgroundColor: "lightblue",
                margin: "10px 30px",
                padding: "20px 10px",
                borderRadius: "5px",
              }}
            >
              {" "}
              <div>
                {" "}
                <AddImage createdBy={createdBy} />
               
              </div>
              <div
                style={{
                  marginBottom: "0px",
                  bottom: "20px",
                  position: "relative",
                  zIndex: "0",
                }}
              >
                {photoURL ? (
                  <img
                    src={photoURL && photoURL}
                    alt="image"
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                ) : null}
              </div>
              <div
                style={{
                  margin: "10px",
                  width: "95%",
                }}
              >
                {post}{" "}
              </div>{" "}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "0 10px",
                  fontWeight: "bold",
                }}
              >
                <div> Location: {location} </div>
                <div> {moment(createdAt).fromNow()} </div>
                <div> </div>

                <br />
              </div>
              <CommentPost id={id} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ViewPost;
