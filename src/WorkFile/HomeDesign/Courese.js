import { Button } from "antd";
import React, { useContext } from "react";
import HeaderView from "../../HeaderView";
import { AuthContext } from "../Context/AuthManager";
import HeaderFile from "./HeaderFile";
import { app } from "../../base";
import { useHistory } from "react-router-dom";

const courseSelected = app.firestore().collection("authUser");

const Courese = () => {
  const hist = useHistory();
  const { current } = useContext(AuthContext);

  const pick1 = async () => {
    const addedCourse = await app.auth().currentUser;
    if (addedCourse) {
      await courseSelected.doc(addedCourse.uid).collection("pick1").doc().set({
        subj1: "intro to Python",
        subj2: "intro to HTML",
      });
    }
  };

  const pick2 = async () => {
    const addedCourse = await app.auth().currentUser;
    if (addedCourse) {
      await courseSelected
        .doc(addedCourse.uid)
        .collection("pick2")
        .doc("pick2")
        .set({
          subj1: "intro to MineCraft",
          subj2: "intro to Javascript",
        });
    }
  };

  const pick3 = async () => {
    const addedCourse = await app.auth().currentUser;
    if (addedCourse) {
      await courseSelected.doc(addedCourse.uid).collection("pick3").doc().set({
        subj1: "intro to BuildBox",
        subj2: "intro to Game Dev",
      });
    }
  };

  const { newCurrent } = useContext(AuthContext);
  return (
    <div>
      <HeaderFile />
      <br />
      <br />
      <br />
      <center>Here is our Studied Courses</center>
      <center
        style={{
          width: "400px",
          display: "flex",
          justifyContent: "center",
          textAlign: "left",
          marginLeft: "100px",
          marginTop: "100px",
        }}
      >
        {newCurrent && newCurrent.profile}
      </center>
      <br />
      <div>choose a course</div>

      <Button
        onClick={() => {
          pick1();
          hist.push("/stu");
        }}
      >
        Pick 1
      </Button>
      <br />
      <br />
      <Button
        onClick={() => {
          pick2();
          hist.push("/stu");
        }}
      >
        Pick 2
      </Button>
      <br />
      <br />

      <Button
        onClick={() => {
          pick3();
          hist.push("/stu");
        }}
      >
        Pick 3
      </Button>
    </div>
  );
};

export default Courese;
