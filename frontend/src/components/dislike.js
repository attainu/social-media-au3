import React, { useState, useEffect } from "react";
const axios = require("axios");
function Dislike({ postid, setflag, flag,username }) {
  const [dislikes, setdislikes] = useState([]);

  const handleClick = id => {
    var usrname = {
      name: username
    };
    // console.log(JSON.parse(localStorage.getItem("user")).Username);
    axios
      .post(`/post/dislike/${id}`, usrname)
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
