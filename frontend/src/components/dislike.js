import React, { useState, useEffect } from "react";
const axios = require("axios");
function Dislike({ postid, setflag, flag }) {
  const [dislikes, setdislikes] = useState([]);

  const handleClick = id => {
    var username = {
      name: JSON.parse(localStorage.getItem("user")).Username
    };
    console.log(JSON.parse(localStorage.getItem("user")).Username);
    axios
      .post(`/post/dislike/${id}`, username)
      .then(res => {
        setdislikes(res);
        setflag(!flag);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <>
      <i class="far fa-thumbs-down text-danger" onClick={() => handleClick(postid)}></i>
    </>
  );
}
export default Dislike;
