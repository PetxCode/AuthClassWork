import React, { useContext } from "react";
import HeaderView from "../../HeaderView";
import { AuthContext } from "../Context/AuthManager";
import HeaderFile from "./HeaderFile";
import { app } from "../../base";
import { Button } from "antd";
import { Link } from "react-router-dom";

const regCourse = app.firestore().collection("authUser");
const StudyScreen = () => {
  const { newCurrent } = useContext(AuthContext);

  const [myCourse1, setMyCourse1] = React.useState([]);
  const [myCourse2, setMyCourse2] = React.useState([]);
  const [myCourse3, setMyCourse3] = React.useState([]);

  const myRegCourse1 = async () => {
    const course = await app.auth().currentUser;

    if (course) {
      await regCourse
        .doc(course.uid)
        .collection("pick2")
        .onSnapshot((snapshot) => {
          const i = [];
          snapshot.forEach((doc) => {
            i.push(doc.data());
          });
          setMyCourse1(i);
        });
    }
  };

  const myRegCourse2 = async () => {
    const course = await app.auth().currentUser;

    if (course) {
      await regCourse
        .doc(course.uid)
        .collection("pick1")
        .onSnapshot((snapshot) => {
          const i = [];
          snapshot.forEach((doc) => {
            i.push(doc.data());
          });
          setMyCourse2(i);
        });
    }
  };

  const myRegCourse3 = async () => {
    const course = await app.auth().currentUser;

    if (course) {
      await regCourse
        .doc(course.uid)
        .collection("pick3")
        .onSnapshot((snapshot) => {
          const i = [];
          snapshot.forEach((doc) => {
            i.push(doc.data());
          });
          setMyCourse3(i);
        });
    }
  };

  React.useEffect(() => {
    myRegCourse1();
    myRegCourse2();
    myRegCourse3();
  }, []);
  return (
    <div>
      <HeaderFile />
      <br />
      <br />
      <br />
      <center>Here is our Study Screen Courses page</center>
      <br />
      <center>
        <Button>
          <Link to="report">View Report</Link>
        </Button>
      </center>
      <br />
      <br />
      <center>
        <h1 style={{ textTransform: "uppercase" }}>
          {newCurrent && newCurrent.name}
        </h1>
      </center>

      <center>
        {myCourse1.map(({ id, subj1, subj2 }) => (
          <div key={id}>
            <h3> {subj1} </h3>
            <h3> {subj2} </h3>
          </div>
        ))}

        {myCourse2.map(({ id, subj1, subj2 }) => (
          <div key={id}>
            <h3> {subj1} </h3>
            <h3> {subj2} </h3>
          </div>
        ))}

        {myCourse3.map(({ id, subj1, subj2 }) => (
          <div key={id}>
            <h3> {subj1} </h3>
            <h3> {subj2} </h3>
          </div>
        ))}
      </center>
    </div>
  );
};

export default StudyScreen;
