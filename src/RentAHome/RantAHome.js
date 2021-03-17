import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import HeaderFile from "../WorkFile/HomeDesign/HeaderFile";
import PostAHome from "./PostAHome";
import { app } from "../base";
import { WechatOutlined } from "@ant-design/icons";
import AvailableButton from "./AvailableButton";
import ShowImage from "./ShowImage";
import ShowAgeinImage from "./ShowAgeinImage";

const home = app.firestore().collection("rent");
const RentAHome = () => {
  const hist = useHistory();
  const [view, setView] = useState([]);

  const getAllHome = async () => {
    const newUser = await app.auth().currentUser;

    if (newUser) {
      await home.orderBy("dateTime", "desc").onSnapshot((snapshot) => {
        const item = [];
        snapshot.forEach((doc) => {
          item.push({ ...doc.data(), id: doc.id });
        });
        setView(item);
        console.log(view);
      });
    }
  };

  useEffect(() => {
    getAllHome();
  }, []);

  return (
    <div>
      <HeaderFile />
      <br />
      <br />
      <br />

      <div>
        <div>
          <div style={{ display: "flex" }}>
            <div>Have a rented apart to display? </div>
            <div>
              <Link
                style={{
                  display: "flex",
                  marginLeft: "5px",
                  color: "red",
                  fontWeight: "bold",
                }}
                to="/post"
              >
                click here to host it{" "}
              </Link>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {view.map(
            ({
              id,
              desc,
              location,
              cost,
              coverImage,
              setFree,
              free,
              createdBy,
            }) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "lightblue",
                    width: "300px",
                    // height: "300px",
                    borderRadius: "5px",
                    padding: "5px",
                    boxShadow: "0 5px 7px -2px rgba(0,0,0,0.35) ",
                  }}
                >
                  <div>
                    {" "}
                    <ShowAgeinImage createdBy={createdBy} />{" "}
                  </div>{" "}
                  <div>
                    <Link to={`/edit/${id}`}>
                      <img
                        src={coverImage && coverImage}
                        alt="cover_image"
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "5px",
                          marginBottom: "10px",
                        }}
                      />
                    </Link>
                  </div>
                  <div>{desc} </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      alignItems: "center",
                      padding: "10px 10px",
                    }}
                  >
                    {" "}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: "bold",
                          marginBottom: "0",
                        }}
                      >
                        {" "}
                        Cost
                      </div>
                      <div> {cost}</div>
                    </div>{" "}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: "bold",
                          marginBottom: "0",
                        }}
                      >
                        {" "}
                        Location
                      </div>
                      <div> {location}</div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: "bold",
                          marginBottom: "0",
                        }}
                      >
                        {" "}
                        Comment
                      </div>
                      <div>
                        {" "}
                        <WechatOutlined
                          style={{
                            fontSize: "20px",
                          }}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: "bold",
                          marginBottom: "0",
                        }}
                      >
                        {" "}
                        Available {free}
                      </div>

                      <AvailableButton createdBy={createdBy} />
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <br />
      <br />
      <div> Home </div>
    </div>
  );
};

export default RentAHome;

// backgroundColor: "red",
// width: "300px",
// height: "180px",
// margin: "10px",
// <ShowImage createdBy={createdBy} />{" "}
