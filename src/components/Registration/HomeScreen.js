import React, { useContext } from "react";
import HeaderView from "../../HeaderView";
import { app } from "../../base";
import { AppContext } from "../ContextAPI/AuthState";

const HomeScreen = () => {
  const { currentUser } = useContext(AppContext);
  return (
    <div>
      <HeaderView />
      <center>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h2>Welcome To Our Auth study platform!</h2>
        <h1>{currentUser && currentUser.email}</h1>
      </center>
    </div>
  );
};

export default HomeScreen;
