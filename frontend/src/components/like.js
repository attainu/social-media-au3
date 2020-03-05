import React, { useState, useEffect } from "react";
const axios = require("axios");
function Like({ postid, setflag, flag ,username}) {
  const [likes, setlikes] = useState([]);

  const handleClick = id => {
    var usrname = {
      name: username
    };
    // console.log(JSON.parse(localStorage.getItem("user")).Username);
    axios
      .post(`/post/like/${id}`, usrname)
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
