import { Button, Input } from "antd";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { app } from "../../base";
import HeaderFile from "./HeaderFile";

const regCourse = app.firestore().collection("authUser");

const Report = () => {
  const [report, setReport] = useState("");
  const [rateAttention, setRateAttention] = useState(0);
  const [ratePerformance, setRatePerformance] = useState(0);
  const [rateLearning, setRateLearning] = useState(0);

  const [chnBtn, setChnBtn] = useState(true);

  const chnState = () => {
    setChnBtn(false);
  };

  const EnterReport = async () => {
    const giveReport = await app.auth().currentUser;

    if (giveReport) {
      await regCourse.doc(giveReport.uid).collection("ClassReport").doc().set({
        report,
        rateAttention,
        ratePerformance,
        rateLearning,
      });
    }
  };

  const pickel3 = async () => {
    const addedCourse = await app.auth().currentUser;
    if (addedCourse) {
      await regCourse.doc(addedCourse.uid).collection("classWork").doc().set({
        report,
        rateAttention,
        ratePerformance,
        rateLearning,
        rateLearningArt: 5,
      });
    }
  };

  useEffect(() => {}, []);
  return (
    <div>
      <HeaderFile />
      <br />
      <br />
      <br />
      <br />

      <center>
        <h2>The Report so far</h2>
      </center>

      <br />
      <br />
      <br />
      <center>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Input
            style={{
              width: "400px",
              marginBottom: "20px",
            }}
            type="text"
            placeholder="Give a brief Report about the class"
            value={report}
            onChange={(e) => {
              setReport(e.target.value);
            }}
          />
          <Input
            style={{
              width: "400px",
              marginBottom: "20px",
            }}
            type="number"
            placeholder="Rate the Attention"
            value={rateAttention}
            onChange={(e) => {
              setRateAttention(e.target.value);
            }}
          />

          <Input
            style={{
              width: "400px",
              marginBottom: "20px",
            }}
            type="number"
            placeholder="Rate the Performance"
            value={ratePerformance}
            onChange={(e) => {
              setRatePerformance(e.target.value);
            }}
          />

          <Input
            style={{
              width: "400px",
              marginBottom: "20px",
            }}
            type="number"
            placeholder="Rate the Learning"
            value={rateLearning}
            onChange={(e) => {
              setRateLearning(e.target.value);
            }}
          />

          <Button
            type="primary"
            disabled={chnState}
            onChange={() => {
              EnterReport();
              setChnBtn(false);
            }}
          >
            <Link to="/">SUBMIT Test</Link>{" "}
          </Button>
          <Button
            style={{ color: "white", marginTop: "20px" }}
            type="primary"
            disabled={chnState}
            onChange={() => {
              EnterReport();
              setChnBtn(false);
            }}
          >
            <Link style={{ color: "white" }}>SUBMIT REPORT</Link>{" "}
          </Button>
        </form>
      </center>
    </div>
  );
};

export default Report;
