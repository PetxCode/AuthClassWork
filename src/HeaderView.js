import { Button } from "antd";
import { Header } from "antd/lib/layout/layout";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./components/ContextAPI/AuthState";
import { app } from "./base";

const HeaderView = () => {
  const { currentUser } = useContext(AppContext);
  return (
    <div>
      <Header
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          color: "white",
        }}
      >
        <div>Logo</div>
        <div>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "white",
              fontSize: "18px",
            }}
          >
            Home
          </Link>
        </div>
        <div>
          <Link
            to="/course"
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "white",
              fontSize: "18px",
            }}
          >
            {" "}
            Course
          </Link>
        </div>
        <div>
          <Link
            to="/stu"
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "white",
              fontSize: "18px",
            }}
          >
            Study{" "}
          </Link>
        </div>
        <div>
          <Link
            to="/stu"
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "white",
              fontSize: "18px",
            }}
          >
            Rent Now{" "}
          </Link>
        </div>

        <div>{currentUser ? <div> {currentUser.email} </div> : null}</div>

        <div>
          {currentUser ? (
            <Button
              onClick={() => {
                app.auth().signOut();
              }}
            >
              Sign Out
            </Button>
          ) : (
            <Button>
              <Link to="/login">Sign Up</Link>
            </Button>
          )}
        </div>
      </Header>
    </div>
  );
};

export default HeaderView;
