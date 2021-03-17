import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { app } from "../base";
import HeaderFile from "../WorkFile/HomeDesign/HeaderFile";

const home = app.firestore().collection("rent");
const ViewDetail = ({ createdBy }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState([]);

  const getData = async () => {
    const docRef = await home.doc(id);
    const docData = await docRef.get();

    setData(docData.data());
  };

  const getUserData = async () => {
    const newUser = await app.auth().currentUser;
    if (newUser) {
      await home
        .doc(createdBy)
        .get()
        .then((doc) => {
          setUserData({ ...doc.data(), id: doc.id });
          console.log(userData);
        });
    }
  };

  useEffect(() => {
    getData();
    getUserData();
  }, []);

  return (
    <div>
      <HeaderFile />
      <div>This is the Detail Page</div>
      <center> {id}</center>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <div>
          <video
            controls
            src={data && data.vid1}
            alt="cover_image"
            style={{
              background: "lightblue",
              width: "300px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "5px",
              marginBottom: "10px",
              margin: "10px",
            }}
          />
        </div>

        <div>
          <video
            src={data && data.vid2}
            type="video/mp4"
            auto
            controls
            alt="cover_image"
            style={{
              background: "lightblue",
              width: "300px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "5px",
              marginBottom: "10px",
              margin: "10px",
            }}
          />
        </div>

        <div>
          <video
            src={data && data.vid3}
            type="video/mp4"
            auto
            controls
            alt="cover_image"
            style={{
              background: "lightblue",
              width: "300px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "5px",
              marginBottom: "10px",
              margin: "10px",
            }}
          />
        </div>

        <div>
          <video
            src={data && data.vid4}
            type="video/mp4"
            auto
            controls
            alt="cover_image"
            style={{
              background: "lightblue",
              width: "300px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "5px",
              marginBottom: "10px",
              margin: "10px",
            }}
          />
        </div>
      </div>

      <br />
      <br />
      <br />
      <center
        style={{
          fontWeight: "bold",
          fontSize: "30px",
        }}
      >
        Pictures
      </center>
      <br />
      <br />
      <br />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <img
          src={data && data.image1}
          alt="image_1"
          style={{
            width: "200px",
            height: "150px",
            objectFit: "cover",
            borderRadius: "5px",
            margin: "20px",
            border: "5px solid black",
          }}
        />
        <img
          src={data && data.image2}
          alt="image_1"
          style={{
            width: "200px",
            height: "150px",
            objectFit: "cover",
            borderRadius: "5px",
            margin: "20px",
            border: "5px solid black",
          }}
        />
        <img
          src={data && data.image3}
          alt="image_1"
          style={{
            width: "200px",
            height: "150px",
            objectFit: "cover",
            borderRadius: "5px",
            margin: "20px",
            border: "5px solid black",
          }}
        />
        <img
          src={data && data.image4}
          alt="image_1"
          style={{
            width: "200px",
            height: "150px",
            objectFit: "cover",
            borderRadius: "5px",
            margin: "20px",
            border: "5px solid black",
          }}
        />
      </div>

      <center
        style={{
          fontSize: "20px",
        }}
      >
        {data && data.desc}
      </center>
      <br />
      <br />
      <center
        style={{
          fontSize: "20px",
        }}
      >
        <div> {data && data.fullAddress}</div>
        <div>
          <div>{userData && userData.name}</div>
          <div> {data && data.contactTel}</div>
        </div>
      </center>
    </div>
  );
};

export default ViewDetail;
