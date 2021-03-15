import React, { useContext } from "react";
import AddPost from "../../Social/addPost";
import ViewPost from "../../Social/ViewPost";
import { AuthContext } from "../Context/AuthManager";
import HeaderFile from "./HeaderFile";

const HomeDesign = () => {
  const { current, newCurrent } = useContext(AuthContext);
  return (
    <div>
      <HeaderFile />
      <br />
      <br />
      <br />
      <center>This is the Home Page</center>
      <div>{newCurrent && newCurrent.name}</div>
      <div>{current && current.email}</div>
      <br />
      <br />
      <br />
      <div>
        <AddPost />
      </div>
      <br />
      <br />
      <br />
      <ViewPost />
    </div>
  );
};

export default HomeDesign;
