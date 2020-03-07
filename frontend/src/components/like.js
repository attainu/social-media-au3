import React, { useState } from "react";
const axios = require("axios");
function Like({ postid, setflag, flag ,username}) {
  const [likes, setlikes] = useState([]);

  const handleClick = id => {
    var usrname = {
      name: username
    };
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
      <i className="far fa-thumbs-up text-success" onClick={() => handleClick(postid)}></i>
    </>
  );
}
export default Like;