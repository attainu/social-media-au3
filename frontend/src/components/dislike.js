import React, { useState } from "react"

const axios = require("axios")

function Dislike({ postid, setflag, flag, username }) {
    
  const [dislikes, setdislikes] = useState([]);

  const handleClick = id => {
        var usrname = {
            name: username
        };
        axios.post(`/api/post/dislike/${id}`, usrname)
        .then(res => {
            setdislikes(res);
            setflag(!flag);
        })
        .catch(error => console.log(error))
    };
    return (
        <>
            <i className="far fa-thumbs-down text-danger" onClick={() => handleClick(postid)}></i>
        </>
    );
}
export default Dislike;