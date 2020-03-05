import React, { useState, useEffect } from "react";
const axios = require("axios");
function Like({ postid, setflag, flag }) {
  const [likes, setlikes] = useState([]);

  const handleClick = id => {
    var username = {
      name: JSON.parse(localStorage.getItem("user")).Username
    };
    console.log(JSON.parse(localStorage.getItem("user")).Username);
    axios
      .post(`/post/like/${id}`, username)
      .then(res => {
        setlikes(res);
        setflag(!flag);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <>
      <i class="far fa-thumbs-up text-success" onClick={() => handleClick(postid)}></i>
    </>
  );
}
export default Like;
