import { Button } from "antd";
import { Header } from "antd/lib/layout/layout";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { app } from "../../base";
import { AuthContext } from "../Context/AuthManager";

const HeaderFile = () => {
  const { current, newCurrent } = useContext(AuthContext);
  return (
    <div>
      <Header
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {current ? (
            <img
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid white",
              }}
              src={newCurrent && newCurrent.avatar}
              alt="Avatar"
            />
          ) : null}

          {current ? (
            <div style={{ color: "white" }}>
              {newCurrent && newCurrent.name}
            </div>
          ) : null}
        </div>
        <div>
          <Link
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
            }}
            to="/"
          >
            Logo
          </Link>
        </div>
        <div>
          <Link
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
            }}
            to="/cos"
          >
            Courses
          </Link>
        </div>
        <div>
          <Link
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
            }}
            to="/stu"
          >
            Study
          </Link>
        </div>
        <div>
          <Link
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
            }}
            to="/rent"
          >
            Rent Now
          </Link>
        </div>
        {current ? (
          <Button
            onClick={(e) => {
              app.auth().signOut();
            }}
          >
            Sign Out
          </Button>
        ) : (
          <Button style={{}}>
            <Link to="/reg">Sign Up</Link>
          </Button>
        )}
      </Header>
    </div>
  );
};

export default HeaderFile;
